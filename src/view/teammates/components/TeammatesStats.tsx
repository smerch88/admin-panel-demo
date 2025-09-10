"use client";

import { useTeammates } from "@/hooks/teammates";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users } from "lucide-react";

interface TeammatesStatsProps {
  locale: string;
}

export const TeammatesStats: React.FC<TeammatesStatsProps> = ({ locale }) => {
  const { data: teammates, isLoading } = useTeammates(locale);

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map(i => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Loading...</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const totalTeammates = teammates?.length || 0;

  const getValueColor = (color?: string) => {
    switch (color) {
      case "green":
        return "text-green-600";
      case "purple":
        return "text-purple-600";
      default:
        return "";
    }
  };

  const stats = [
    {
      title: "Усього учасників команди",
      value: totalTeammates,
      description: `${locale.toUpperCase()} мова`,
      color: "purple" as const,
    },
    {
      title: "Активні учасники",
      value: totalTeammates,
      description: "Усі учасники команди активні",
      color: "purple" as const,
    },
    {
      title: "Закриті збори",
      value: locale.toUpperCase(),
      description: "Поточна мова",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={`text-2xl font-bold ${getValueColor(stat.color)}`}>
              {stat.value}
            </div>
            <p className="text-xs text-muted-foreground">{stat.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
