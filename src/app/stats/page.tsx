import type { Metadata } from "next";
import StatsView from "@/view/stats/stats.view";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export const metadata: Metadata = {
  title: "Stats | Inharmony Admin",
  description: "View platform statistics and analytics",
};

export default function StatsPage() {
  return (
    <ProtectedRoute>
      <StatsView />
    </ProtectedRoute>
  );
}
