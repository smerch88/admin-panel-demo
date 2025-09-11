"use client";

import { useMerch } from "@/hooks/merch";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Edit, ExternalLink, Globe, ShoppingBag } from "lucide-react";
import { Merch } from "@/lib/types";

interface MerchDetailsProps {
  locale: string;
  onEdit: (merch: Merch) => void;
}

export const MerchDetails: React.FC<MerchDetailsProps> = ({
  locale,
  onEdit,
}) => {
  const { data: merch, isLoading, error } = useMerch(locale);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Налаштування мерчу</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/3"></div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Merch Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-red-500">
              Не вдалося завантажити налаштування мерчу
            </p>
            <p className="text-sm text-gray-500 mt-2">
              Будь ласка, спробуйте оновити сторінку або зверніться до служби
              підтримки, якщо проблема не зникне.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!merch) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Налаштування мерчу</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <ShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">
              Налаштувань мерчу для {locale.toUpperCase()} не знайдено
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Натисніть &quot;Редагувати налаштування мерчу&quot;, щоб створити
              нові налаштування
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Налаштування мерчу</CardTitle>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEdit(merch)}
            className="flex items-center space-x-2"
          >
            <Edit className="h-4 w-4" />
            <span>Редагувати</span>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Globe className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-500">Мова</p>
                <Badge variant="outline" className="text-sm">
                  {merch.locale?.toUpperCase()}
                </Badge>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <ShoppingBag className="h-5 w-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-500">Статус</p>
                <Badge
                  variant={merch.status === "on" ? "default" : "secondary"}
                  className="text-sm"
                >
                  {merch.status === "on" ? "Enabled" : "Disabled"}
                </Badge>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-gray-500 mb-2">
                Вміст кнопки
              </p>
              <p className="text-sm text-gray-700 bg-gray-50 p-3 rounded border">
                {merch.content || "No content set"}
              </p>
            </div>

            <div>
              <p className="text-sm font-medium text-gray-500 mb-2">
                Посилання на мерч
              </p>
              <div className="flex items-center space-x-2">
                <p className="text-sm text-gray-700 break-all flex-1">
                  {merch.link || "No link set"}
                </p>
                {merch.link && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => window.open(merch.link, "_blank")}
                    className="h-6 w-6 p-0 flex-shrink-0"
                  >
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>

        {merch.status === "on" && (
          <div className="pt-4 border-t">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                <p className="text-sm font-medium text-green-800">
                  Кнопка мерчу наразі активна
                </p>
              </div>
              <p className="text-sm text-green-600 mt-1">
                Користувачі побачать кнопку мерчу з вказаним вмістом &quot;
                {merch.content}&quot;
                {merch.link && " посилання на " + merch.link}
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
