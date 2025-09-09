"use client";

import { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { LocaleSwitcher, PageHeader } from "@/components/common";
import { Partner } from "@/lib/types";
import {
  PartnersHeader,
  PartnersStats,
  PartnersTable,
  PartnersDialogs,
} from "./components";

export default function PartnersView() {
  const [selectedLocale, setSelectedLocale] = useState("ua");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);

  const handleCreatePartner = () => {
    setSelectedPartner(null);
    setIsCreateDialogOpen(true);
  };

  const handleEditPartner = (partner: Partner) => {
    setSelectedPartner(partner);
    setIsEditDialogOpen(true);
  };

  const handleViewPartner = (partner: Partner) => {
    setSelectedPartner(partner);
    setIsViewDialogOpen(true);
  };

  const handleDeletePartner = (partner: Partner) => {
    setSelectedPartner(partner);
    setIsDeleteDialogOpen(true);
  };

  const handleLocaleChange = (locale: string) => {
    setSelectedLocale(locale);
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <PageHeader
            title="Управління партнерами"
            description="Керуйте партнерськими організаціями та їхньою інформацією"
          />

          <div className="flex items-center justify-between">
            <LocaleSwitcher
              selectedLocale={selectedLocale}
              onLocaleChange={handleLocaleChange}
            />
            <PartnersHeader onCreatePartner={handleCreatePartner} />
          </div>

          <PartnersStats locale={selectedLocale} />

          <PartnersTable
            locale={selectedLocale}
            onEdit={handleEditPartner}
            onView={handleViewPartner}
            onDelete={handleDeletePartner}
          />

          <PartnersDialogs
            isCreateOpen={isCreateDialogOpen}
            isEditOpen={isEditDialogOpen}
            isViewOpen={isViewDialogOpen}
            isDeleteOpen={isDeleteDialogOpen}
            selectedPartner={selectedPartner}
            onCloseCreate={() => setIsCreateDialogOpen(false)}
            onCloseEdit={() => setIsEditDialogOpen(false)}
            onCloseView={() => setIsViewDialogOpen(false)}
            onCloseDelete={() => setIsDeleteDialogOpen(false)}
            onEdit={handleEditPartner}
            onDelete={handleDeletePartner}
          />
        </div>
      </div>
    </AdminLayout>
  );
}
