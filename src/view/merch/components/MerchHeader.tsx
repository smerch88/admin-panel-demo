"use client";

import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";

interface MerchHeaderProps {
  onEdit: (merch: any) => void;
  selectedLocale: string;
}

export const MerchHeader: React.FC<MerchHeaderProps> = ({
  onEdit,
  selectedLocale,
}) => {
  const handleEdit = () => {
    // Create a placeholder merch object for editing
    const placeholderMerch = {
      locale: selectedLocale as "en" | "ua",
      status: "off" as "on" | "off",
      content: "",
      link: "",
    };
    onEdit(placeholderMerch);
  };

  return (
    <div className="flex items-center space-x-3">
      <Button onClick={handleEdit} className="flex items-center space-x-2">
        <Edit className="h-4 w-4" />
        <span>Редагувати налаштування мерчу</span>
      </Button>
    </div>
  );
};
