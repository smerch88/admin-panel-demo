"use client";

import { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { LocaleSwitcher, PageHeader } from "@/components/common";
import { Merch } from "@/lib/types";
import { MerchHeader, MerchDetails, MerchModal } from "./components";

export default function MerchView() {
  const [selectedLocale, setSelectedLocale] = useState("ua");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [merchData, setMerchData] = useState<Merch | null>(null);

  const handleLocaleChange = (locale: string) => {
    setSelectedLocale(locale);
    setIsModalOpen(false);
    setMerchData(null);
  };

  const handleEdit = (merch: Merch) => {
    setMerchData(merch);
    setIsModalOpen(true);
  };

  const handleCreate = () => {
    setMerchData(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setMerchData(null);
  };

  const handleSuccess = () => {
    setIsModalOpen(false);
    setMerchData(null);
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <PageHeader
            title="Управління мерчем"
            description="Керуйте налаштуваннями кнопок мерчу для різних мов"
          />

          <div className="flex items-center justify-between">
            <LocaleSwitcher
              selectedLocale={selectedLocale}
              onLocaleChange={handleLocaleChange}
            />
            <MerchHeader
              onEdit={handleCreate}
              selectedLocale={selectedLocale}
            />
          </div>

          <MerchDetails locale={selectedLocale} onEdit={handleEdit} />

          <MerchModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            locale={selectedLocale}
            merchData={merchData}
            onSuccess={handleSuccess}
          />
        </div>
      </div>
    </AdminLayout>
  );
}
