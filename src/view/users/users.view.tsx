"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AdminLayout } from "@/components/AdminLayout";
import { PageHeader } from "@/components/common";
import { User } from "@/lib/types";
import { useDeleteUser, useCurrentUser } from "@/hooks/auth";
import {
  UsersHeader,
  UsersStats,
  UsersTable,
  UsersDialogs,
} from "./components";

export default function UsersView() {
  const router = useRouter();
  const { data: currentUser, isLoading: isUserLoading } = useCurrentUser();
  const deleteUser = useDeleteUser();

  // All hooks must be called at the top level, before any early returns
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // Redirect editors away from users page
  useEffect(() => {
    if (!isUserLoading && currentUser && currentUser.role !== "admin") {
      router.push("/dashboard");
    }
  }, [currentUser, isUserLoading, router]);

  // Show loading or redirect if not admin
  if (isUserLoading) {
    return (
      <AdminLayout>
        <div className="p-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center py-8">
              <p>Loading...</p>
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  if (!currentUser || currentUser.role !== "admin") {
    return null; // Will redirect via useEffect
  }

  const handleCreate = () => {
    setSelectedUser(null);
    setIsCreateDialogOpen(true);
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setIsEditDialogOpen(true);
  };

  const handleDelete = (user: User) => {
    setSelectedUser(user);
    setIsDeleteDialogOpen(true);
  };

  const handleCloseCreateDialog = () => {
    setIsCreateDialogOpen(false);
    setSelectedUser(null);
  };

  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
    setSelectedUser(null);
  };

  const handleCloseDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    setSelectedUser(null);
  };

  const handleCreateSuccess = () => {
    setIsCreateDialogOpen(false);
    setSelectedUser(null);
  };

  const handleEditSuccess = () => {
    setIsEditDialogOpen(false);
    setSelectedUser(null);
  };

  const handleConfirmDelete = async () => {
    if (selectedUser) {
      try {
        await deleteUser.mutateAsync(selectedUser._id);
        setIsDeleteDialogOpen(false);
        setSelectedUser(null);
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <PageHeader
            title="Users Management"
            description="Manage admin and editor users for the system"
          />

          <UsersHeader onCreate={handleCreate} />
          <UsersStats />
          <UsersTable onEdit={handleEdit} onDelete={handleDelete} />

          <UsersDialogs
            isCreateDialogOpen={isCreateDialogOpen}
            isEditDialogOpen={isEditDialogOpen}
            isDeleteDialogOpen={isDeleteDialogOpen}
            onCloseCreateDialog={handleCloseCreateDialog}
            onCloseEditDialog={handleCloseEditDialog}
            onCloseDeleteDialog={handleCloseDeleteDialog}
            onCreateSuccess={handleCreateSuccess}
            onEditSuccess={handleEditSuccess}
            onConfirmDelete={handleConfirmDelete}
            selectedUser={selectedUser}
          />
        </div>
      </div>
    </AdminLayout>
  );
}
