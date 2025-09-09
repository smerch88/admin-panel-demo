"use client";

import { useState, useEffect } from "react";
import { useUpdateMerch } from "@/hooks/merch";
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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Save, X } from "lucide-react";
import { UpdateMerchRequest, Merch } from "@/lib/types";

interface MerchFormProps {
  locale: string;
  merchData?: Merch | null;
  onSuccess: () => void;
  onCancel: () => void;
}

export const MerchForm: React.FC<MerchFormProps> = ({
  locale,
  merchData,
  onSuccess,
  onCancel,
}) => {
  const updateMerch = useUpdateMerch();

  const [formData, setFormData] = useState<UpdateMerchRequest>({
    status: "off",
    content: "",
    link: "",
  });

  useEffect(() => {
    if (merchData) {
      setFormData({
        status: merchData.status,
        content: merchData.content,
        link: merchData.link,
      });
    }
  }, [merchData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateMerch.mutateAsync({
        locale,
        merchData: formData,
      });
      onSuccess();
    } catch (error) {
      console.error("Error updating merch:", error);
    }
  };

  const isLoading = updateMerch.isPending;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Merch Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="status">Статус *</Label>
              <Select
                value={formData.status}
                onValueChange={(value: "on" | "off") =>
                  setFormData({ ...formData, status: value })
                }
                disabled={isLoading}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="on">Увімкнено</SelectItem>
                  <SelectItem value="off">Вимкнено</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-500">
                Коли увімкнено, кнопка мерчу буде видимою для користувачів.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Вміст кнопки *</Label>
              <Input
                id="content"
                type="text"
                value={formData.content}
                onChange={e =>
                  setFormData({ ...formData, content: e.target.value })
                }
                placeholder="e.g., Наш мерч, Our Merch, etc."
                required
                maxLength={100}
                disabled={isLoading}
              />
              <p className="text-xs text-gray-500">
                {formData.content.length}/100 символи
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="link">Посилання на мерч *</Label>
              <Input
                id="link"
                type="url"
                value={formData.link}
                onChange={e =>
                  setFormData({ ...formData, link: e.target.value })
                }
                placeholder="https://example-merch-store.com"
                required
                maxLength={512}
                disabled={isLoading}
              />
              <p className="text-xs text-gray-500">
                {formData.link.length}/512 символи
              </p>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isLoading}
              className="flex items-center space-x-2"
            >
              <X className="h-4 w-4" />
              <span>Cancel</span>
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="flex items-center space-x-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Збереження...</span>
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  <span>Зберегти зміни</span>
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
