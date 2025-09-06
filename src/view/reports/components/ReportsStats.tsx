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
      title: "Total Reports",
      value: reports?.length || 0,
      color: "blue" as const,
    },
    {
      title: "Current Year",
      value:
        reports?.filter(
          (report: Report) =>
            report.year === new Date().getFullYear().toString()
        ).length || 0,
      color: "green" as const,
    },
    {
      title: "This Month",
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
      color: "red" as const,
    },
    {
      title: "Language",
      value: locale.toUpperCase(),
      color: "default" as const,
    },
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">Reports Overview</h3>
      <StatsCards stats={stats} />
    </div>
  );
};
