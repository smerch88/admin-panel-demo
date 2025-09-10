"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Collection } from "@/lib/types";
import { Edit, Trash2, Eye } from "lucide-react";
import { SafeImage } from "@/components/common";
import { getImageUrl, isValidImageUrl } from "@/lib/utils";

interface CollectionsTableProps {
  collections: Collection[];
  selectedLocale: string;
  onView: (collection: Collection) => void;
  onEdit: (collection: Collection) => void;
  onDelete: (collection: Collection) => void;
}

export const CollectionsTable: React.FC<CollectionsTableProps> = ({
  collections,
  selectedLocale,
  onView,
  onEdit,
  onDelete,
}) => {
  if (collections.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Collections ({selectedLocale.toUpperCase()})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-gray-500">
              Не знайдено жодної колекції для цієї локалі.
            </p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Збори ({selectedLocale.toUpperCase()})</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Зображення</TableHead>
              <TableHead>Назва</TableHead>
              <TableHead>Статус</TableHead>
              <TableHead>Тип</TableHead>
              <TableHead>Зібрано</TableHead>
              <TableHead>Ціль</TableHead>
              <TableHead>Залишилось днів</TableHead>
              <TableHead>Дії</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {collections.map(collection => (
              <TableRow key={collection._id}>
                <TableCell>
                  {(() => {
                    const imageUrl = getImageUrl(collection.image);

                    if (imageUrl && isValidImageUrl(imageUrl)) {
                      return (
                        <SafeImage
                          src={imageUrl}
                          alt={collection.title}
                          width={48}
                          height={48}
                          fallbackText="No img"
                        />
                      );
                    } else {
                      return (
                        <div className="w-12 h-12 bg-gray-200 rounded border flex items-center justify-center">
                          <span className="text-gray-400 text-xs">No img</span>
                        </div>
                      );
                    }
                  })()}
                </TableCell>
                <TableCell className="font-medium">
                  {collection.title}
                </TableCell>
                <TableCell>
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      collection.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-[#E4E4E7]"
                    }`}
                  >
                    {collection.status}
                  </span>
                </TableCell>
                <TableCell>{collection.type}</TableCell>
                <TableCell>₴{collection.collected.toLocaleString()}</TableCell>
                <TableCell>₴{collection.target.toLocaleString()}</TableCell>
                <TableCell>
                  {collection.days ? `${collection.days} days` : "N/A"}
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onView(collection)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit(collection)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onDelete(collection)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
