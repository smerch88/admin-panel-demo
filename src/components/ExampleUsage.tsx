"use client";

import { useState } from "react";
import {
  useUsers,
  useCollections,
  useCreateCollection,
  useReports,
  useCreateReport,
  usePartners,
  useCreatePartner,
  useTeammates,
  useMerch,
} from "@/hooks";
import { CreateCollectionRequest } from "@/lib/types";
import { useAuth } from "@/contexts/AuthContext";
import { getImageUrl, getCollectionImageUrl, isAdmin } from "@/lib/utils";

export function ExampleUsage() {
  // Auth hooks
  const { data: users, isLoading: usersLoading } = useUsers();

  // Collections hooks
  const { data: collectionsData, isLoading: collectionsLoading } =
    useCollections("en");
  const createCollection = useCreateCollection();

  // Get current user from auth context
  const { user: currentUser } = useAuth();

  // Reports hooks
  const { data: reports, isLoading: reportsLoading } = useReports("ua");
  const createReport = useCreateReport();

  // Partners hooks
  const { data: partners, isLoading: partnersLoading } = usePartners();
  const createPartner = useCreatePartner();

  // Teammates hooks
  const { data: teammates, isLoading: teammatesLoading } = useTeammates("ua");

  // Merch hooks
  const { data: merch, isLoading: merchLoading } = useMerch();

  const handleCreateCollection = () => {
    // Create a mock file for demonstration
    const mockFile = new File([""], "example-image.jpg", {
      type: "image/jpeg",
    });

    const newCollection: CreateCollectionRequest = {
      title: "Example Collection",
      image: mockFile,
      collected: 0,
      target: 10000,
      alt: "Example collection image",
      peopleDonate: 0,
      peopleDonate_title: "donors",
      desc: "This is an example collection description",
      period: "days",
      value: "example-collection",
      importance: "important",
      long_desc: [
        "Section 1: Introduction",
        "Section 2: Details",
        "Section 3: Conclusion",
      ],
    };
    createCollection.mutate({ locale: "en", collectionData: newCollection });
  };

  const handleCreateReport = () => {
    createReport.mutate({
      year: "2025",
      month: "Січень",
      url: "https://example.com/report.pdf",
      language: "ua",
    });
  };

  const handleCreatePartner = () => {
    // Create a mock file for demonstration
    const mockFile = new File([""], "partner-logo.jpg", { type: "image/jpeg" });

    createPartner.mutate({
      image: mockFile,
      logo: "Example Partner",
      link: "https://example.com",
      language: "ua",
    });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">
        Admin Panel API Integration Example
      </h1>

      {/* Current User Info */}
      {currentUser && (
        <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Current User</h2>
          <p className="text-sm">
            <strong>Name:</strong> {currentUser.name} |<strong>Email:</strong>{" "}
            {currentUser.email} |<strong>Role:</strong> {currentUser.role}
          </p>
          {isAdmin() && (
            <p className="text-xs text-green-600 mt-1">
              ✓ Admin privileges available
            </p>
          )}
        </div>
      )}

      {/* Data Display */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Users */}
        <div className="p-4 border rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Users</h3>
          {usersLoading ? (
            <p>Loading users...</p>
          ) : (
            <div className="space-y-2">
              {users?.map(user => (
                <div key={user.id} className="p-2 bg-gray-50 rounded">
                  <p className="font-medium">{user.name}</p>
                  <p className="text-sm text-gray-600">{user.email}</p>
                  <p className="text-xs text-gray-500">Role: {user.role}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Collections */}
        <div className="p-4 border rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Collections</h3>
          <button
            onClick={handleCreateCollection}
            disabled={createCollection.isPending}
            className="mb-2 px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600 disabled:opacity-50"
          >
            {createCollection.isPending ? "Creating..." : "Create Collection"}
          </button>
          {collectionsLoading ? (
            <p>Loading collections...</p>
          ) : (
            <div className="space-y-2">
              {collectionsData?.data.activeCollections?.map(collection => (
                <div key={collection._id} className="p-2 bg-gray-50 rounded">
                  <p className="font-medium">{collection.title}</p>
                  <p className="text-sm text-gray-600">{collection.desc}</p>
                  {collection.image && collection.image.length > 0 && (
                    <img
                      src={getCollectionImageUrl(collection.image[0])}
                      alt={collection.alt}
                      className="w-16 h-16 object-cover rounded mt-1"
                    />
                  )}
                  <p className="text-xs text-gray-500">
                    Collected: {collection.collected} / {collection.target} |
                    Donors: {collection.peopleDonate} | Status:{" "}
                    {collection.status}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Reports */}
        <div className="p-4 border rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Reports</h3>
          <button
            onClick={handleCreateReport}
            disabled={createReport.isPending}
            className="mb-2 px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600 disabled:opacity-50"
          >
            {createReport.isPending ? "Creating..." : "Create Report"}
          </button>
          {reportsLoading ? (
            <p>Loading reports...</p>
          ) : (
            <div className="space-y-2">
              {reports?.map(report => (
                <div key={report._id} className="p-2 bg-gray-50 rounded">
                  <p className="font-medium">
                    {report.month} {report.year}
                  </p>
                  <p className="text-sm text-gray-600">
                    Language: {report.language}
                  </p>
                  <p className="text-xs text-blue-500">
                    <a
                      href={report.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      View Report
                    </a>
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Partners */}
        <div className="p-4 border rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Partners</h3>
          <button
            onClick={handleCreatePartner}
            disabled={createPartner.isPending}
            className="mb-2 px-3 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600 disabled:opacity-50"
          >
            {createPartner.isPending ? "Creating..." : "Create Partner"}
          </button>
          {partnersLoading ? (
            <p>Loading partners...</p>
          ) : (
            <div className="space-y-2">
              {partners?.map(partner => (
                <div key={partner._id} className="p-2 bg-gray-50 rounded">
                  <p className="font-medium">{partner.logo}</p>
                  <p className="text-sm text-gray-600">
                    Language: {partner.language}
                  </p>
                  {partner.image && (
                    <img
                      src={getCollectionImageUrl(partner.image)}
                      alt={partner.logo}
                      className="w-12 h-12 object-cover rounded mt-1"
                    />
                  )}
                  <p className="text-xs text-blue-500">
                    <a
                      href={partner.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visit Website
                    </a>
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Teammates */}
        <div className="p-4 border rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Team Members</h3>
          {teammatesLoading ? (
            <p>Loading teammates...</p>
          ) : (
            <div className="space-y-2">
              {teammates?.map(teammate => (
                <div key={teammate._id} className="p-2 bg-gray-50 rounded">
                  <p className="font-medium">{teammate.name}</p>
                  <p className="text-sm text-gray-600">{teammate.role}</p>
                  <p className="text-xs text-gray-500">
                    {teammate.description}
                  </p>
                  {teammate.image && (
                    <img
                      src={getCollectionImageUrl(teammate.image)}
                      alt={teammate.name}
                      className="w-12 h-12 object-cover rounded mt-1"
                    />
                  )}
                  <p className="text-xs text-gray-500">
                    Language: {teammate.locale}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Merch */}
        <div className="p-4 border rounded-lg">
          <h3 className="text-lg font-semibold mb-2">Merch</h3>
          {merchLoading ? (
            <p>Loading merch...</p>
          ) : (
            <div className="space-y-2">
              {merch?.map(item => (
                <div key={item.locale} className="p-2 bg-gray-50 rounded">
                  <p className="font-medium">Locale: {item.locale}</p>
                  <p className="text-sm text-gray-600">{item.content}</p>
                  <p className="text-xs text-blue-500">
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visit Merch
                    </a>
                  </p>
                  <p className="text-xs text-gray-500">Status: {item.status}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
