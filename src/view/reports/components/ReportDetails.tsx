"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Calendar, Globe, FileText } from "lucide-react";
import { Report } from "@/lib/types";

interface ReportDetailsProps {
  report: Report;
}

export const ReportDetails: React.FC<ReportDetailsProps> = ({ report }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm font-medium text-gray-500">Рік</p>
              <p className="text-lg font-semibold">{report.year}</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm font-medium text-gray-500">Місяць</p>
              <Badge variant="secondary" className="text-sm">
                {report.month}
              </Badge>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Globe className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm font-medium text-gray-500">Мова</p>
              <Badge variant="outline" className="text-sm">
                {report.language}
              </Badge>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm font-medium text-gray-500">Тип</p>
              <Badge variant="secondary" className="text-sm">
                {report.type}
              </Badge>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <FileText className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm font-medium text-gray-500">Статус</p>
              <Badge variant="outline" className="text-sm">
                {report.status}
              </Badge>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-start space-x-2">
            <FileText className="h-5 w-5 text-gray-400 mt-1" />
            <div className="flex-1">
              <p className="text-sm font-medium text-gray-500 mb-2">
                Посилання на звіт
              </p>
              <div className="flex items-center space-x-2">
                <p className="text-sm text-gray-700 break-all">{report.url}</p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => window.open(report.url, "_blank")}
                  className="h-6 w-6 p-0 flex-shrink-0"
                >
                  <ExternalLink className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-4 border-t">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Звіт ID</p>
            <p className="text-sm font-mono text-gray-700">{report._id}</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Створено</p>
            <p className="text-sm text-gray-700">
              {report.createdAt
                ? new Date(report.createdAt).toLocaleDateString()
                : "N/A"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
