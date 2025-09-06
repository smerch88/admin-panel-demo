import type { Metadata } from "next";
import ReportsView from "@/view/reports/reports.view";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export const metadata: Metadata = {
  title: "Reports | Inharmony Admin",
  description: "View and manage platform reports",
};

export default function ReportsPage() {
  return (
    <ProtectedRoute>
      <ReportsView />
    </ProtectedRoute>
  );
}
