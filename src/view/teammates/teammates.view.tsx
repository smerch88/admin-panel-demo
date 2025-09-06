"use client";

import { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { LocaleSwitcher, PageHeader } from "@/components/common";
import { Teammate } from "@/lib/types";
import { useDeleteTeammate } from "@/hooks/teammates";
import {
  TeammatesHeader,
  TeammatesStats,
  TeammatesTable,
  TeammatesDialogs,
} from "./components";

export default function TeammatesView() {
  const [selectedLocale, setSelectedLocale] = useState("ua");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedTeammate, setSelectedTeammate] = useState<Teammate | null>(
    null
  );

  const deleteTeammate = useDeleteTeammate();

  const handleCreateTeammate = () => {
    setSelectedTeammate(null);
    setIsCreateDialogOpen(true);
  };

  const handleEditTeammate = (teammate: Teammate) => {
    setSelectedTeammate(teammate);
    setIsEditDialogOpen(true);
  };

  const handleViewTeammate = (teammate: Teammate) => {
    setSelectedTeammate(teammate);
    setIsViewDialogOpen(true);
  };

  const handleDeleteTeammate = (teammate: Teammate) => {
    setSelectedTeammate(teammate);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedTeammate) {
      try {
        await deleteTeammate.mutateAsync({
          id: selectedTeammate._id,
          locale: selectedTeammate.locale || selectedLocale,
        });
        setIsDeleteDialogOpen(false);
        setSelectedTeammate(null);
      } catch (error) {
        console.error("Error deleting teammate:", error);
      }
    }
  };

  const handleLocaleChange = (locale: string) => {
    setSelectedLocale(locale);
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <PageHeader
            title="Teammates Management"
            description="Manage team members and their information"
          />

          <div className="flex items-center justify-between">
            <LocaleSwitcher
              selectedLocale={selectedLocale}
              onLocaleChange={handleLocaleChange}
            />
            <TeammatesHeader onCreateTeammate={handleCreateTeammate} />
          </div>

          <TeammatesStats locale={selectedLocale} />

          <TeammatesTable
            locale={selectedLocale}
            onEdit={handleEditTeammate}
            onView={handleViewTeammate}
            onDelete={handleDeleteTeammate}
          />

          <TeammatesDialogs
            isCreateOpen={isCreateDialogOpen}
            isEditOpen={isEditDialogOpen}
            isViewOpen={isViewDialogOpen}
            isDeleteOpen={isDeleteDialogOpen}
            selectedTeammate={selectedTeammate}
            locale={selectedLocale}
            onCloseCreate={() => setIsCreateDialogOpen(false)}
            onCloseEdit={() => setIsEditDialogOpen(false)}
            onCloseView={() => setIsViewDialogOpen(false)}
            onCloseDelete={() => setIsDeleteDialogOpen(false)}
            onEdit={handleEditTeammate}
            onDelete={handleDeleteTeammate}
            onConfirmDelete={handleConfirmDelete}
          />
        </div>
      </div>
    </AdminLayout>
  );
}
