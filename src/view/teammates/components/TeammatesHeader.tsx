"use client";

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface TeammatesHeaderProps {
  onCreateTeammate: () => void;
}

export const TeammatesHeader: React.FC<TeammatesHeaderProps> = ({
  onCreateTeammate,
}) => {
  return (
    <div className="flex items-center space-x-3">
      <Button
        onClick={onCreateTeammate}
        className="flex items-center space-x-2"
      >
        <Plus className="h-4 w-4" />
        <span>Додати учасника команди</span>
      </Button>
    </div>
  );
};
