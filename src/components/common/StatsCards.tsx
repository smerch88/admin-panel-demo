"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatCard {
  title: string;
  value: string | number;
  color?: "default" | "green" | "red" | "blue";
}

interface StatsCardsProps {
  stats: StatCard[];
  className?: string;
}

export const StatsCards: React.FC<StatsCardsProps> = ({
  stats,
  className = "grid grid-cols-1 md:grid-cols-4 gap-6 mb-8",
}) => {
  const getValueColor = (color?: string) => {
    switch (color) {
      case "green":
        return "text-green-600";
      case "red":
        return "text-red-600";
      case "blue":
        return "text-blue-600";
      default:
        return "";
    }
  };

  return (
    <div className={className}>
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getValueColor(stat.color)}`}>
              {stat.value}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
