"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Globe, Building, Link } from "lucide-react";
import { Partner } from "@/lib/types";
import { SafeImage } from "@/components/common";
import { getImageUrl, isValidImageUrl } from "@/lib/utils";
import Image from "next/image";

interface PartnerDetailsProps {
  partner: Partner;
}

export const PartnerDetails: React.FC<PartnerDetailsProps> = ({ partner }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Building className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm font-medium text-gray-500">Організація</p>
              <p className="text-lg font-semibold">{partner.logo}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Globe className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm font-medium text-gray-500">Мова</p>
              <Badge variant="outline" className="text-sm">
                {partner.language}
              </Badge>
            </div>
          </div>

          <div className="flex items-start space-x-2">
            <Link className="h-5 w-5 text-gray-400 mt-1" />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-500 mb-2">
                Посилання на веб-сайт
              </p>
              <div className="flex items-center space-x-2">
                <p className="text-sm text-gray-700 break-all">
                  {partner.link}
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.open(partner.link, "_blank")}
                  className="h-6 w-6 p-0 flex-shrink-0"
                >
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start space-x-2">
            <Building className="h-5 w-5 text-gray-400 mt-1" />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-500 mb-2">
                Зображення партнера
              </p>
              <Image
                src={`${process.env.NEXT_PUBLIC_IMAGE_BASE_URL}${partner.image[0].path}`}
                alt={partner.logo}
                width={200}
                height={150}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Партнер ID</p>
            <p className="text-sm font-mono text-gray-700">{partner._id}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Створено</p>
            <p className="text-sm text-gray-700">
              {partner.createdAt
                ? new Date(partner.createdAt).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
