"use client";

import { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { PageHeader } from "@/components/common";
import { Stats } from "@/lib/types";
import { StatsHeader, StatsDisplay, StatsDialogs } from "./components";

export default function StatsView() {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [statsData, setStatsData] = useState<Stats | null>(null);

  const handleEdit = (stats: Stats) => {
    setStatsData(stats);
    setIsEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setIsEditDialogOpen(false);
    setStatsData(null);
  };

  const handleEditSuccess = () => {
    setIsEditDialogOpen(false);
    setStatsData(null);
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          <PageHeader
            title="Управління статистикою"
            description="Керуйте даними статистики для сторінки «Про нас»"
          />

          <StatsHeader onEdit={handleEdit} />
          <StatsDisplay onEdit={handleEdit} />

          <StatsDialogs
            isEditDialogOpen={isEditDialogOpen}
            onCloseEditDialog={handleCloseEditDialog}
            onEditSuccess={handleEditSuccess}
            statsData={statsData}
          />
        </div>
      </div>
    </AdminLayout>
  );
}
