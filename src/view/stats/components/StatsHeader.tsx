"use client";

import { Stats } from "@/lib/types";
import { useStats } from "@/hooks/stats";

interface StatsHeaderProps {
  onEdit: (stats: any) => void;
}

export const StatsHeader: React.FC<StatsHeaderProps> = ({ onEdit }) => {
  const { data: stats, isLoading, error } = useStats();

  const handleEdit = () => {
    if (stats) onEdit(stats);
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <button
          onClick={handleEdit}
          disabled={isLoading || !!error || !stats}
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-black hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
        >
          Редагувати статистику
        </button>
      </div>
    </div>
  );
};
