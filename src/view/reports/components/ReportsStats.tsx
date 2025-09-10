"use client";

import { useReports } from "@/hooks/reports";
import { StatsCards } from "@/components/common";
import { Report } from "@/lib/types";

interface ReportsStatsProps {
  locale: string;
}

export const ReportsStats: React.FC<ReportsStatsProps> = ({ locale }) => {
  const { data: reports } = useReports(locale);

  const stats = [
    {
      title: "Усього звітів",
      value: reports?.length || 0,
      color: "purple" as const,
    },
    {
      title: "Поточний рік",
      value:
        reports?.filter(
          (report: Report) =>
            report.year === new Date().getFullYear().toString()
        ).length || 0,
      color: "purple" as const,
    },
    {
      title: "Цього місяця",
      value:
        reports?.filter((report: Report) => {
          const currentMonth = new Date().toLocaleString("default", {
            month: "long",
          });
          return (
            report.month === currentMonth &&
            report.year === new Date().getFullYear().toString()
          );
        }).length || 0,
      color: "purple" as const,
    },
    {
      title: "Мова",
      value: locale.toUpperCase(),
      color: "default" as const,
    },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Огляд звітів</h3>
      <StatsCards stats={stats} />
    </div>
  );
};
