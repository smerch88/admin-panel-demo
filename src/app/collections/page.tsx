import type { Metadata } from "next";
import CollectionsView from "@/view/collections/collections.view";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export const metadata: Metadata = {
  title: "Collections | Inharmony Admin",
  description: "Manage content collections and categories",
};

export default function CollectionsPage() {
  return (
    <ProtectedRoute>
      <CollectionsView />
    </ProtectedRoute>
  );
}
