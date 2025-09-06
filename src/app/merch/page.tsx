import type { Metadata } from "next";
import MerchView from "@/view/merch/merch.view";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export const metadata: Metadata = {
  title: "Merch | Inharmony Admin",
  description: "Manage merch button settings and store links",
};

export default function MerchPage() {
  return (
    <ProtectedRoute>
      <MerchView />
    </ProtectedRoute>
  );
}
