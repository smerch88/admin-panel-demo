"use client";

import { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { LocaleSwitcher, PageHeader } from "@/components/common";
import { Report } from "@/lib/types";
import {
  ReportsHeader,
  ReportsStats,
  ReportsTable,
  ReportsDialogs,
} from "./components";

export default function ReportsView() {
  const [selectedLocale, setSelectedLocale] = useState("ua");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);

  const handleCreateReport = () => {
    setSelectedReport(null);
    setIsCreateDialogOpen(true);
  };

  const handleEditReport = (report: Report) => {
    setSelectedReport(report);
    setIsEditDialogOpen(true);
  };

  const handleViewReport = (report: Report) => {
    setSelectedReport(report);
    setIsViewDialogOpen(true);
  };

  const handleDeleteReport = (report: Report) => {
    setSelectedReport(report);
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
            title="Reports Management"
            description="Manage monthly reports and documentation"
          />

          <div className="flex items-center justify-between">
            <LocaleSwitcher
              selectedLocale={selectedLocale}
              onLocaleChange={handleLocaleChange}
            />
            <ReportsHeader onCreateReport={handleCreateReport} />
          </div>

          <ReportsStats locale={selectedLocale} />

          <ReportsTable
            locale={selectedLocale}
            onEdit={handleEditReport}
            onView={handleViewReport}
            onDelete={handleDeleteReport}
          />

          <ReportsDialogs
            isCreateOpen={isCreateDialogOpen}
            isEditOpen={isEditDialogOpen}
            isViewOpen={isViewDialogOpen}
            isDeleteOpen={isDeleteDialogOpen}
            selectedReport={selectedReport}
            onCloseCreate={() => setIsCreateDialogOpen(false)}
            onCloseEdit={() => setIsEditDialogOpen(false)}
            onCloseView={() => setIsViewDialogOpen(false)}
            onCloseDelete={() => setIsDeleteDialogOpen(false)}
            onEdit={handleEditReport}
            onDelete={handleDeleteReport}
          />
        </div>
      </div>
    </AdminLayout>
  );
}
