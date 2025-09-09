"use client";

import { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { PageHeader } from "@/components/common";
import { User } from "@/lib/types";
import { useDeleteUser } from "@/hooks/auth";
import {
  UsersHeader,
  UsersStats,
  UsersTable,
  UsersDialogs,
} from "./components";

export default function UsersView() {
  const deleteUser = useDeleteUser();

  // All hooks must be called at the top level, before any early returns
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

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
            title="Управління користувачами"
            description="Керуйте адміністраторами та редакторами системи"
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
