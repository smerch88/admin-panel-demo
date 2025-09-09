"use client";

import { useStats } from "@/hooks/stats";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, Users, Shirt, Droplets, Pill, Heart, Zap } from "lucide-react";
import { Stats } from "@/lib/types";

interface StatsDisplayProps {
  onEdit: (stats: Stats) => void;
}

const statIcons = {
  fedPeople: Users,
  providedWithClothing: Shirt,
  providedWithWater: Droplets,
  receivedMedications: Pill,
  fedAnimals: Heart,
  providedWithElectricity: Zap,
};

const statLabels = {
  fedPeople: "Годування людей",
  providedWithClothing: "Надано одяг",
  providedWithWater: "Забезпечено водою",
  receivedMedications: "Отримано ліки",
  fedAnimals: "Годування тварин",
  providedWithElectricity: "Надано електрику",
};

export const StatsDisplay: React.FC<StatsDisplayProps> = ({ onEdit }) => {
  const { data: stats, isLoading, error } = useStats();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map(i => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Loading...</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-red-500">Не вдалося завантажити статистику</p>
            <p className="text-sm text-gray-500 mt-2">
              Будь ласка, спробуйте оновити сторінку або зверніться до служби
              підтримки, якщо проблема не зникне.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!stats) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-gray-500">Статистику не знайдено</p>
            <p className="text-sm text-gray-400 mt-2">
              Натисніть &quot;Редагувати статистику&quot;, щоб додати дані
              статистики.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-900">
          Поточна статистика
        </h3>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onEdit(stats)}
          className="flex items-center space-x-2"
        >
          <Edit className="h-4 w-4" />
          <span>Редагувати</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(stats).map(([key, statItem]) => {
          const Icon = statIcons[key as keyof typeof statIcons];
          const label = statLabels[key as keyof typeof statLabels];

          return (
            <Card key={key}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{label}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {statItem.amount.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  {statItem.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-center space-x-2">
          <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
          <p className="text-sm font-medium text-blue-800">
            Статистика відображається на сторінці «Про нас»
          </p>
        </div>
        <p className="text-sm text-blue-600 mt-1">
          Ці цифри показують загальний вплив гуманітарної діяльності вашої
          організації.
        </p>
      </div>
    </div>
  );
};
