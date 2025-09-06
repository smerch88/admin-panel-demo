import type { Metadata } from "next";
import DashboardView from "@/view/dashboard/dashboard.view";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export const metadata: Metadata = {
  title: "Dashboard | Inharmony Admin",
  description: "Admin dashboard for managing Inharmony platform",
};

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardView />
    </ProtectedRoute>
  );
}
