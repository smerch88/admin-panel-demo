import type { Metadata } from "next";
import TeammatesView from "@/view/teammates/teammates.view";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export const metadata: Metadata = {
  title: "Teammates | Inharmony Admin",
  description: "Manage team members and their information",
};

export default function TeammatesPage() {
  return (
    <ProtectedRoute>
      <TeammatesView />
    </ProtectedRoute>
  );
}
