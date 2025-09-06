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
      title: "Total Collections",
      value: totalCollections,
    },
    {
      title: "Active Collections",
      value: activeCollections,
      color: "green" as const,
    },
    {
      title: "Closed Collections",
      value: closedCollections,
      color: "red" as const,
    },
    {
      title: "Total Raised",
      value: `$${totalRaised.toLocaleString()}`,
      color: "blue" as const,
    },
  ];

  return <StatsCards stats={stats} />;
};
