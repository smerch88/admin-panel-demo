"use client";

import { usePartners } from "@/hooks/partners";
import { StatsCards } from "@/components/common";
import { Partner } from "@/lib/types";

interface PartnersStatsProps {
  locale: string;
}

export const PartnersStats: React.FC<PartnersStatsProps> = ({ locale }) => {
  const { data: partners } = usePartners();

  const stats = [
    {
      title: "Усього партнерів",
      value: partners?.length || 0,
      color: "purple" as const,
    },
    {
      title: "Поточна мова",
      value:
        partners?.filter((partner: Partner) => partner.language === locale)
          .length || 0,
      color: "purple" as const,
    },
    {
      title: "Зі зображеннями",
      value:
        partners?.filter(
          (partner: Partner) =>
            partner.image && partner.image.length > 0 && partner.image[0]?.url
        ).length || 0,
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
      <h3 className="text-lg font-semibold text-gray-900">Огляд партнерів</h3>
      <StatsCards stats={stats} />
    </div>
  );
};
