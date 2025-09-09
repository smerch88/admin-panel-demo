"use client";

import { Collection } from "@/lib/types";
import { StatsCards } from "@/components/common/StatsCards";

interface CollectionsStatsProps {
  collections: Collection[];
}

export const CollectionsStats: React.FC<CollectionsStatsProps> = ({
  collections,
}) => {
  const totalCollections = collections.length;
  const activeCollections = collections.filter(
    c => c.status === "active"
  ).length;
  const closedCollections = collections.filter(
    c => c.status === "closed"
  ).length;
  const totalRaised = collections.reduce((sum, c) => sum + c.collected, 0);

  const stats = [
    {
      title: "Всього зборів",
      value: totalCollections,
    },
    {
      title: "Активні збори",
      value: activeCollections,
      color: "green" as const,
    },
    {
      title: "Закриті збори",
      value: closedCollections,
      color: "red" as const,
    },
    {
      title: "Загальна сума зібраного",
      value: `$${totalRaised.toLocaleString()}`,
      color: "blue" as const,
    },
  ];

  return <StatsCards stats={stats} />;
};
