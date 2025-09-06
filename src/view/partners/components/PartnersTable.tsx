"use client";

import { usePartners } from "@/hooks/partners";
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
import { Eye, Edit, Trash2, ExternalLink } from "lucide-react";
import { Partner } from "@/lib/types";
import { SafeImage } from "@/components/common";
import { getImageUrl, isValidImageUrl } from "@/lib/utils";

interface PartnersTableProps {
  locale: string;
  onEdit: (partner: Partner) => void;
  onView: (partner: Partner) => void;
  onDelete: (partner: Partner) => void;
}

export const PartnersTable: React.FC<PartnersTableProps> = ({
  locale,
  onEdit,
  onView,
  onDelete,
}) => {
  const { data: partners, isLoading } = usePartners();

  // Filter partners by locale
  const filteredPartners =
    partners?.filter((partner: Partner) => partner.language === locale) || [];

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

  if (filteredPartners.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 text-center">
          <p className="text-gray-500">
            No partners found for {locale.toUpperCase()} language.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Partners ({filteredPartners.length})
        </h3>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Logo</TableHead>
                <TableHead>Language</TableHead>
                <TableHead>Link</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredPartners.map((partner: Partner) => (
                <TableRow key={partner._id}>
                  <TableCell>
                    {(() => {
                      const imageUrl = getImageUrl(partner.image);

                      if (imageUrl && isValidImageUrl(imageUrl)) {
                        return (
                          <SafeImage
                            src={imageUrl}
                            alt={partner.logo}
                            width={60}
                            height={40}
                            className="rounded"
                            fallbackText="No img"
                          />
                        );
                      } else {
                        return (
                          <div className="w-15 h-10 bg-gray-200 rounded border flex items-center justify-center">
                            <span className="text-gray-400 text-xs">
                              No img
                            </span>
                          </div>
                        );
                      }
                    })()}
                  </TableCell>
                  <TableCell className="font-medium">{partner.logo}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{partner.language}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600 truncate max-w-xs">
                        {partner.link}
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => window.open(partner.link, "_blank")}
                        className="h-6 w-6 p-0"
                      >
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onView(partner)}
                        className="h-8 w-8 p-0"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onEdit(partner)}
                        className="h-8 w-8 p-0"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onDelete(partner)}
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
