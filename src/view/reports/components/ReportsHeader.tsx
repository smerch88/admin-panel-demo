"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface ReportsHeaderProps {
  onCreateReport: () => void;
}

export const ReportsHeader: React.FC<ReportsHeaderProps> = ({
  onCreateReport,
}) => {
  return (
    <div className="flex items-center space-x-4">
      <Button onClick={onCreateReport} className="flex items-center space-x-2">
        <Plus className="h-4 w-4" />
        <span>Додати звіт</span>
      </Button>
    </div>
  );
};
