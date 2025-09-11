"use client";

import { Collection } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SafeImage } from "@/components/common";
import { getImageUrl } from "@/lib/utils";

interface CollectionDetailsProps {
  collection: Collection;
}

export function CollectionDetails({ collection }: CollectionDetailsProps) {
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat("uk-UA", {
      style: "currency",
      currency: "UAH",
      currencyDisplay: "symbol",
    })
      .format(amount)
      .replace("грн", "₴");
  };

  const getStatusColor = (status: string) => {
    return status === "active"
      ? "bg-green-100 text-green-800"
      : "bg-red-100 text-red-800";
  };

  const getImportanceColor = (importance: string) => {
    switch (importance) {
      case "urgent":
        return "bg-red-100 text-red-800";
      case "important":
        return "bg-orange-100 text-orange-800";
      case "non-urgent":
        return "bg-blue-100 text-blue-800";
      case "permanent":
        return "bg-purple-100 text-purple-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Основна інформація</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-500">
                Заголовок
              </label>
              <p className="text-lg font-semibold">{collection.title}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Опис</label>
              <p className="text-gray-700">{collection.desc}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">
                Альтернативний текст
              </label>
              <p className="text-gray-700">{collection.alt || "N/A"}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Тип</label>
              <p className="text-gray-700">{collection.type}</p>
            </div>
            <div className="col-span-2">
              <label className="text-sm font-medium text-gray-500">
                Зображення
              </label>
              <div className="flex flex-wrap gap-2 mt-2">
                {collection.image && collection.image.length > 0 ? (
                  collection.image
                    .map((img, index) => {
                      const imageUrl = getImageUrl(img);
                      return imageUrl ? (
                        <div key={index} className="relative">
                          <SafeImage
                            src={imageUrl}
                            alt={`Collection image ${index + 1}`}
                            width={96}
                            height={96}
                            className="object-cover rounded-lg border shadow-sm"
                          />
                          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 rounded-b-lg">
                            {img.path}
                          </div>
                        </div>
                      ) : null;
                    })
                    .filter(Boolean)
                ) : (
                  <p className="text-gray-500">Немає зображень</p>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Financial Information */}
      <Card>
        <CardHeader>
          <CardTitle>Фінансова інформація</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <label className="text-sm font-medium text-gray-500">
                Зібрано
              </label>
              <p className="text-2xl font-bold text-green-600">
                {formatCurrency(collection.collected)}
              </p>
            </div>
            <div className="text-center">
              <label className="text-sm font-medium text-gray-500">Ціль</label>
              <p className="text-2xl font-bold text-blue-600">
                {formatCurrency(collection.target)}
              </p>
              <p className="text-sm text-gray-500">Ціль</p>
            </div>
            <div className="text-center">
              <label className="text-sm font-medium text-gray-500">
                Прогрес
              </label>
              <p className="text-2xl font-bold text-purple-600">
                {Math.round((collection.collected / collection.target) * 100)}%
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                <div
                  className="bg-purple-600 h-2 rounded-full"
                  style={{
                    width: `${Math.min((collection.collected / collection.target) * 100, 100)}%`,
                  }}
                ></div>
              </div>
            </div>
            <div className="text-center">
              <label className="text-sm font-medium text-gray-500">
                Кількість донорів
              </label>
              <p className="text-2xl font-bold text-orange-600">
                {collection.peopleDonate}
              </p>
              <p className="text-sm text-gray-500">
                {collection.peopleDonate_title}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Campaign Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Налаштування кампанії</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-500">
                Статус
              </label>
              <Badge className={`mt-1 ${getStatusColor(collection.status)}`}>
                {collection.status}
              </Badge>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">
                Важливість
              </label>
              <Badge
                className={`mt-1 ${getImportanceColor(collection.importance)}`}
              >
                {collection.importance}
              </Badge>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">
                Тривалість
              </label>
              <p className="text-gray-700">
                {collection.days
                  ? `${collection.days} ${collection.period}`
                  : "N/A"}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">
                Кількість
              </label>
              <p className="text-gray-700">{collection.quantity || "N/A"}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Long Description */}
      {collection.long_desc && (
        <Card>
          <CardHeader>
            <CardTitle>Детальний опис</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {collection.long_desc.section1 && (
                <div className="border-l-4 border-indigo-500 pl-4">
                  <h4 className="font-medium text-gray-900 mb-2">Розділ 1</h4>
                  <p className="text-gray-700">
                    {collection.long_desc.section1}
                  </p>
                </div>
              )}
              {collection.long_desc.section2 && (
                <div className="border-l-4 border-indigo-500 pl-4">
                  <h4 className="font-medium text-gray-900 mb-2">Розділ 2</h4>
                  <p className="text-gray-700">
                    {collection.long_desc.section2}
                  </p>
                </div>
              )}
              {collection.long_desc.section3 && (
                <div className="border-l-4 border-indigo-500 pl-4">
                  <h4 className="font-medium text-gray-900 mb-2">Розділ 3</h4>
                  <p className="text-gray-700">
                    {collection.long_desc.section3}
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Metadata */}
      <Card>
        <CardHeader>
          <CardTitle>Метадані</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-500">
                Створено
              </label>
              <p className="text-gray-700">
                {new Date(collection.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Мова</label>
              <p className="text-gray-700">{collection.language}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">
                Значення
              </label>
              <p className="text-gray-700">{collection.value || "N/A"}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">
                Закрито
              </label>
              <p className="text-gray-700">
                {collection.closedAt
                  ? new Date(collection.closedAt).toLocaleDateString()
                  : "N/A"}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
