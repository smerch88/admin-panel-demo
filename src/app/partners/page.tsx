import type { Metadata } from "next";
import PartnersView from "@/view/partners/partners.view";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export const metadata: Metadata = {
  title: "Partners | Inharmony Admin",
  description: "Manage partners and collaborations",
};

export default function PartnersPage() {
  return (
    <ProtectedRoute>
      <PartnersView />
    </ProtectedRoute>
  );
}
