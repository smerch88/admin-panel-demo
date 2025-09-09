"use client";

import { useTeammates } from "@/hooks/teammates";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Eye, Edit, Trash2 } from "lucide-react";
import { Teammate } from "@/lib/types";
import { SafeImage } from "@/components/common";
import { getImageUrl, isValidImageUrl } from "@/lib/utils";

interface TeammatesTableProps {
  locale: string;
  onEdit: (teammate: Teammate) => void;
  onView: (teammate: Teammate) => void;
  onDelete: (teammate: Teammate) => void;
}

export const TeammatesTable: React.FC<TeammatesTableProps> = ({
  locale,
  onEdit,
  onView,
  onDelete,
}) => {
  const { data: teammates, isLoading } = useTeammates(locale);

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow">
        <div className="p-6">
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!teammates || teammates.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 text-center">
          <p className="text-gray-500">
            Учасників команди для мови {locale.toUpperCase()} не знайдено.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Учасники команди ({teammates.length})
        </h3>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Фото</TableHead>
                <TableHead>Ім&apos;я</TableHead>
                <TableHead>Роль</TableHead>
                <TableHead>Опис</TableHead>
                <TableHead>Мова</TableHead>
                <TableHead>Дії</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teammates.map((teammate: Teammate) => (
                <TableRow key={teammate._id}>
                  <TableCell>
                    {(() => {
                      const imageUrl = getImageUrl(teammate.image);

                      if (imageUrl && isValidImageUrl(imageUrl)) {
                        return (
                          <SafeImage
                            src={imageUrl}
                            alt={teammate.name}
                            width={60}
                            height={60}
                            className="rounded-full"
                            fallbackText="No img"
                          />
                        );
                      } else {
                        return (
                          <div className="w-15 h-15 bg-gray-200 rounded-full border flex items-center justify-center">
                            <span className="text-gray-400 text-xs">
                              No img
                            </span>
                          </div>
                        );
                      }
                    })()}
                  </TableCell>
                  <TableCell className="font-medium">{teammate.name}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{teammate.role}</Badge>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm text-gray-600 max-w-xs truncate">
                      {teammate.description}
                    </p>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary">
                      {teammate.locale?.toUpperCase() || "N/A"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onView(teammate)}
                        className="h-8 w-8 p-0"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit(teammate)}
                        className="h-8 w-8 p-0"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDelete(teammate)}
                        className="h-8 w-8 p-0 text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};
