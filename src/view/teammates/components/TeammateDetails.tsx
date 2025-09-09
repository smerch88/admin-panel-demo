"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Edit, User, Briefcase, FileText, Globe } from "lucide-react";
import { Teammate } from "@/lib/types";
import { SafeImage } from "@/components/common";
import { getImageUrl, isValidImageUrl } from "@/lib/utils";

interface TeammateDetailsProps {
  teammate: Teammate;
}

export const TeammateDetails: React.FC<TeammateDetailsProps> = ({
  teammate,
}) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <User className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm font-medium text-gray-500">Ім&apos;я</p>
              <p className="text-lg font-semibold">{teammate.name}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Briefcase className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm font-medium text-gray-500">Роль</p>
              <Badge variant="outline" className="text-sm">
                {teammate.role}
              </Badge>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Globe className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm font-medium text-gray-500">Мова</p>
              <Badge variant="secondary" className="text-sm">
                {teammate.locale?.toUpperCase() || "N/A"}
              </Badge>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start space-x-2">
            <User className="h-5 w-5 text-gray-400 mt-1" />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-500 mb-2">
                Фото профілю
              </p>
              {(() => {
                const imageUrl = getImageUrl(teammate.image);

                if (imageUrl && isValidImageUrl(imageUrl)) {
                  return (
                    <SafeImage
                      src={imageUrl}
                      alt={teammate.name}
                      width={200}
                      height={200}
                      className="rounded-full border"
                      fallbackText="No image"
                    />
                  );
                } else {
                  return (
                    <div className="w-50 h-50 bg-gray-200 rounded-full border flex items-center justify-center">
                      <span className="text-gray-400 text-sm">No image</span>
                    </div>
                  );
                }
              })()}
            </div>
          </div>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <FileText className="h-5 w-5" />
            <span>Опис</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 leading-relaxed">
            {teammate.description}
          </p>
        </CardContent>
      </Card>

      <div className="pt-4 border-t">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Учасник команди ID</p>
            <p className="text-sm font-mono text-gray-700">{teammate._id}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Створено</p>
            <p className="text-sm text-gray-700">
              {teammate.createdAt
                ? new Date(teammate.createdAt).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
