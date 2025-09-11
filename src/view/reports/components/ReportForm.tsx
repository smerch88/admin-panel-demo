"use client";

import { useState, useEffect } from "react";
import { useCreateReport, useUpdateReport } from "@/hooks/reports";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";
import { Report, CreateReportRequest, UpdateReportRequest } from "@/lib/types";

interface ReportFormProps {
  report?: Report | null;
  onSuccess: () => void;
  onCancel: () => void;
}

const MONTHS = [
  "Січень",
  "Лютий",
  "Березень",
  "Квітень",
  "Травень",
  "Червень",
  "Липень",
  "Серпень",
  "Вересень",
  "Жовтень",
  "Листопад",
  "Грудень",
];

const LANGUAGES = [
  { value: "ua", label: "Українська" },
  { value: "en", label: "English" },
];

export const ReportForm: React.FC<ReportFormProps> = ({
  report,
  onSuccess,
  onCancel,
}) => {
  const isEditing = !!report;
  const createReport = useCreateReport();
  const updateReport = useUpdateReport();

  const [formData, setFormData] = useState<CreateReportRequest>({
    year: new Date().getFullYear().toString(),
    month: "",
    url: "",
    language: "ua",
  });

  useEffect(() => {
    if (report) {
      setFormData({
        year: report.year,
        month: report.month,
        url: report.url,
        language: report.language,
      });
    }
  }, [report]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isEditing && report) {
        const updateData: UpdateReportRequest = {
          year: formData.year,
          month: formData.month,
          url: formData.url,
          language: formData.language,
        };
        await updateReport.mutateAsync({
          id: report._id,
          reportData: updateData,
        });
      } else {
        await createReport.mutateAsync(formData);
      }
      onSuccess();
    } catch (error) {
      throw error;
    }
  };

  const isLoading = createReport.isPending || updateReport.isPending;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="year">Рік</Label>
          <Input
            id="year"
            type="text"
            value={formData.year}
            onChange={e => setFormData({ ...formData, year: e.target.value })}
            placeholder="2024"
            required
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="month">Місяць</Label>
          <Select
            value={formData.month}
            onValueChange={value => setFormData({ ...formData, month: value })}
            disabled={isLoading}
          >
            <SelectTrigger>
              <SelectValue placeholder="Обрати місяць" />
            </SelectTrigger>
            <SelectContent>
              {MONTHS.map(month => (
                <SelectItem key={month} value={month}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="url">Посилання на звіт</Label>
        <Input
          id="url"
          type="url"
          value={formData.url}
          onChange={e => setFormData({ ...formData, url: e.target.value })}
          placeholder="https://example.com/report.pdf"
          required
          disabled={isLoading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="language">Мова</Label>
        <Select
          value={formData.language}
          onValueChange={(value: "ua" | "en") =>
            setFormData({ ...formData, language: value })
          }
          disabled={isLoading}
        >
          <SelectTrigger>
            <SelectValue placeholder="Обрати мову" />
          </SelectTrigger>
          <SelectContent>
            {LANGUAGES.map(lang => (
              <SelectItem key={lang.value} value={lang.value}>
                {lang.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end space-x-3">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
        >
          Скасувати
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {isEditing ? "Оновлення..." : "Створення..."}
            </>
          ) : isEditing ? (
            "Оновити звіт"
          ) : (
            "Створити звіт"
          )}
        </Button>
      </div>
    </form>
  );
};
