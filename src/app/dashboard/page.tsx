"use client";

import { useEffect, useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { useCollections } from "@/hooks/collections";
import { usePartners } from "@/hooks/partners";
import { useReports } from "@/hooks/reports";
import { useMerch } from "@/hooks/merch";
import { useTeammates } from "@/hooks/teammates";
import { useUsers } from "@/hooks/auth";
import {
  Collection,
  Partner,
  Report,
  Merch,
  Teammate,
  User,
} from "@/lib/types";

interface DashboardData {
  collections: Collection[];
  partners: Partner[];
  reports: Report[];
  merch: Merch[];
  teammates: Teammate[];
  users: User[];
}

// Available locales for the application
const AVAILABLE_LOCALES = [
  { code: "ua", name: "Українська", flag: "🇺🇦" },
  { code: "en", name: "English", flag: "🇺🇸" },
];

export default function DashboardPage() {
  const [selectedLocale, setSelectedLocale] = useState("ua");
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    collections: [],
    partners: [],
    reports: [],
    merch: [],
    teammates: [],
    users: [],
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error] = useState<string | null>(null);

  // Fetch all data using hooks with selected locale
  const { data: collectionsData, isLoading: collectionsLoading } =
    useCollections(selectedLocale, 1, 10);
  const { data: partnersData, isLoading: partnersLoading } = usePartners();
  const { data: reportsData, isLoading: reportsLoading } = useReports();
  const { data: merchData, isLoading: merchLoading } = useMerch();
  const { data: teammatesData, isLoading: teammatesLoading } =
    useTeammates(selectedLocale);
  const { data: usersData, isLoading: usersLoading } = useUsers();

  useEffect(() => {
    // Check if all data is loaded
    const allLoaded =
      !collectionsLoading &&
      !partnersLoading &&
      !reportsLoading &&
      !merchLoading &&
      !teammatesLoading &&
      !usersLoading;

    if (allLoaded) {
      // Handle collections data structure properly
      let collectionsArray: Collection[] = [];
      if (collectionsData?.data) {
        // Extract collections from the paginated response
        const { activeCollections = [], closedCollections = [] } =
          collectionsData.data;
        collectionsArray = [...activeCollections, ...closedCollections];
      }

      setDashboardData({
        collections: collectionsArray,
        partners: partnersData || [],
        reports: reportsData || [],
        merch: merchData || [],
        teammates: teammatesData || [],
        users: usersData || [],
      });
      setIsLoading(false);
    }
  }, [
    collectionsLoading,
    partnersLoading,
    reportsLoading,
    merchLoading,
    teammatesLoading,
    usersLoading,
    collectionsData,
    partnersData,
    reportsData,
    merchData,
    teammatesData,
    usersData,
  ]);

  // Handle locale change
  const handleLocaleChange = (locale: string) => {
    setSelectedLocale(locale);
    setIsLoading(true); // Show loading while fetching new locale data
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-b-2 border-indigo-600"></div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-full">
          <div className="text-red-600 text-xl">Error: {error}</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          {/* Locale Switcher */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>

              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-700">
                  Language:
                </span>
                <div className="flex bg-white rounded-lg shadow-sm border">
                  {AVAILABLE_LOCALES.map(locale => (
                    <button
                      key={locale.code}
                      onClick={() => handleLocaleChange(locale.code)}
                      className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                        selectedLocale === locale.code
                          ? "bg-indigo-600 text-white"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      <span className="mr-2">{locale.flag}</span>
                      {locale.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {/* Collections */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Collections ({selectedLocale.toUpperCase()})
              </h2>
              <div className="space-y-2">
                {dashboardData.collections.length > 0 ? (
                  dashboardData.collections.map((collection: Collection) => (
                    <div
                      key={collection._id}
                      className="p-3 bg-gray-50 rounded"
                    >
                      <p className="font-medium">{collection.title}</p>
                      <p className="text-sm text-gray-600">{collection.desc}</p>
                      <div className="mt-2 text-xs text-gray-500">
                        <span className="mr-2">
                          Status: {collection.status}
                        </span>
                        <span>Type: {collection.type}</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No collections found</p>
                )}
              </div>
            </div>

            {/* Partners */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Partners
              </h2>
              <div className="space-y-2">
                {dashboardData.partners.length > 0 ? (
                  dashboardData.partners
                    .filter(
                      (partner: Partner) => partner.language === selectedLocale
                    )
                    .map((partner: Partner) => (
                      <div key={partner._id} className="p-3 bg-gray-50 rounded">
                        <p className="font-medium">Partner {partner._id}</p>
                        <p className="text-sm text-gray-600">
                          Language: {partner.language}
                        </p>
                        <p className="text-xs text-blue-600">
                          <a
                            href={partner.link}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {partner.link}
                          </a>
                        </p>
                      </div>
                    ))
                ) : (
                  <p className="text-gray-500">No partners found</p>
                )}
              </div>
            </div>

            {/* Reports */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Reports
              </h2>
              <div className="space-y-2">
                {dashboardData.reports.length > 0 ? (
                  dashboardData.reports
                    .filter(
                      (report: Report) => report.language === selectedLocale
                    )
                    .map((report: Report) => (
                      <div key={report._id} className="p-3 bg-gray-50 rounded">
                        <p className="font-medium">
                          {report.month} {report.year}
                        </p>
                        <p className="text-sm text-gray-600">
                          Language: {report.language}
                        </p>
                        <p className="text-xs text-blue-600">
                          <a
                            href={report.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Report
                          </a>
                        </p>
                      </div>
                    ))
                ) : (
                  <p className="text-gray-500">No reports found</p>
                )}
              </div>
            </div>

            {/* Merch */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Merch
              </h2>
              {dashboardData.merch.length > 0 ? (
                dashboardData.merch
                  .filter((merch: Merch) => merch.locale === selectedLocale)
                  .map((merch: Merch) => (
                    <div
                      key={merch.locale}
                      className="p-3 bg-gray-50 rounded mb-2"
                    >
                      <p className="font-medium">Status: {merch.status}</p>
                      <p className="text-sm text-gray-600">{merch.content}</p>
                      <p className="text-xs text-blue-600 mt-2">
                        <a
                          href={merch.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {merch.link}
                        </a>
                      </p>
                    </div>
                  ))
              ) : (
                <p className="text-gray-500">No merch data found</p>
              )}
            </div>

            {/* Teammates */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Teammates ({selectedLocale.toUpperCase()})
              </h2>
              <div className="space-y-2">
                {dashboardData.teammates.length > 0 ? (
                  dashboardData.teammates.map((teammate: Teammate) => (
                    <div key={teammate._id} className="p-3 bg-gray-50 rounded">
                      <p className="font-medium">{teammate.name}</p>
                      <p className="text-sm text-gray-600">
                        Role: {teammate.role}
                      </p>
                      <p className="text-xs text-gray-500">
                        {teammate.description}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No teammates found</p>
                )}
              </div>
            </div>

            {/* Users */}
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">
                Users
              </h2>
              <div className="space-y-2">
                {dashboardData.users.length > 0 ? (
                  dashboardData.users.map((user: User) => (
                    <div key={user._id} className="p-3 bg-gray-50 rounded">
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                      <p className="text-xs text-gray-500">Role: {user.role}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No users found</p>
                )}
              </div>
            </div>
          </div>

          {/* Data Summary */}
          <div className="mt-8 bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Data Summary ({selectedLocale.toUpperCase()})
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {dashboardData.collections.length}
                </div>
                <div className="text-sm text-gray-600">Collections</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">
                  {
                    dashboardData.partners.filter(
                      p => p.language === selectedLocale
                    ).length
                  }
                </div>
                <div className="text-sm text-gray-600">Partners</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {
                    dashboardData.reports.filter(
                      r => r.language === selectedLocale
                    ).length
                  }
                </div>
                <div className="text-sm text-gray-600">Reports</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {dashboardData.teammates.length}
                </div>
                <div className="text-sm text-gray-600">Teammates</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-600">
                  {dashboardData.users.length}
                </div>
                <div className="text-sm text-gray-600">Users</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-indigo-600">
                  {
                    dashboardData.merch.filter(m => m.locale === selectedLocale)
                      .length
                  }
                </div>
                <div className="text-sm text-gray-600">Merch</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
