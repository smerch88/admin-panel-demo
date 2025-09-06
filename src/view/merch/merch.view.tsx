"use client";

import { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { LocaleSwitcher, PageHeader } from "@/components/common";
import { Merch } from "@/lib/types";
import { MerchHeader, MerchForm, MerchDetails } from "./components";

export default function MerchView() {
  const [selectedLocale, setSelectedLocale] = useState("ua");
  const [isEditMode, setIsEditMode] = useState(false);
  const [merchData, setMerchData] = useState<Merch | null>(null);

  const handleLocaleChange = (locale: string) => {
    setSelectedLocale(locale);
    setIsEditMode(false);
    setMerchData(null);
  };

  const handleEdit = (merch: Merch) => {
    setMerchData(merch);
    setIsEditMode(true);
  };

  const handleCancel = () => {
    setIsEditMode(false);
    setMerchData(null);
  };

  const handleSuccess = () => {
    setIsEditMode(false);
    setMerchData(null);
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <PageHeader
            title="Merch Management"
            description="Manage merch button settings for different languages"
          />

          <div className="flex items-center justify-between">
            <LocaleSwitcher
              selectedLocale={selectedLocale}
              onLocaleChange={handleLocaleChange}
            />
            <MerchHeader onEdit={handleEdit} selectedLocale={selectedLocale} />
          </div>

          {isEditMode ? (
            <MerchForm
              locale={selectedLocale}
              merchData={merchData}
              onSuccess={handleSuccess}
              onCancel={handleCancel}
            />
          ) : (
            <MerchDetails locale={selectedLocale} onEdit={handleEdit} />
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
