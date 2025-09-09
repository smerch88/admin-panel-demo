"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface PartnersHeaderProps {
  onCreatePartner: () => void;
}

export const PartnersHeader: React.FC<PartnersHeaderProps> = ({
  onCreatePartner,
}) => {
  return (
    <div className="flex items-center space-x-4">
      <Button onClick={onCreatePartner} className="flex items-center space-x-2">
        <Plus className="h-4 w-4" />
        <span>Додати партнера</span>
      </Button>
    </div>
  );
};
