"use client";

import { AdminLayout } from "@/components/AdminLayout";
import { PageHeader } from "@/components/common";

export default function DashboardView() {
  return (
    <AdminLayout>
      <div className="p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <PageHeader
            title="Dashboard"
            description="Welcome to the Inharmony Admin Panel"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Quick Actions
              </h3>
              <p className="text-gray-600">
                Manage your content, users, and settings from the navigation
                menu.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Recent Activity
              </h3>
              <p className="text-gray-600">
                View recent changes and updates across your admin panel.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                System Status
              </h3>
              <p className="text-gray-600">All systems are running normally.</p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
