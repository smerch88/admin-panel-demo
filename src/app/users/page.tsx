import type { Metadata } from "next";
import UsersView from "@/view/users/users.view";
import { ProtectedRoute } from "@/components/ProtectedRoute";

export const metadata: Metadata = {
  title: "Users | Inharmony Admin",
  description: "Manage admin and editor users (Admin only)",
};

export default function UsersPage() {
  return (
    <ProtectedRoute requiredRole="admin">
      <UsersView />
    </ProtectedRoute>
  );
}
