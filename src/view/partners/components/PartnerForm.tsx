"use client";

import { useState, useEffect } from "react";
import { useCreatePartner, useUpdatePartner } from "@/hooks/partners";
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
import { Loader2, Upload, X } from "lucide-react";
import {
  Partner,
  CreatePartnerRequest,
  UpdatePartnerRequest,
} from "@/lib/types";
import { SafeImage } from "@/components/common";
import { getImageUrl } from "@/lib/utils";
import Image from "next/image";

interface PartnerFormProps {
  partner?: Partner | null;
  onSuccess: () => void;
  onCancel: () => void;
}

const LANGUAGES = [
  { value: "ua", label: "Українська" },
  { value: "en", label: "English" },
];

export const PartnerForm: React.FC<PartnerFormProps> = ({
  partner,
  onSuccess,
  onCancel,
}) => {
  const isEditing = !!partner;
  const createPartner = useCreatePartner();
  const updatePartner = useUpdatePartner();

  const [formData, setFormData] = useState<CreatePartnerRequest>({
    image: null as any,
    logo: "",
    link: "",
    language: "ua",
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  useEffect(() => {
    if (partner) {
      setFormData({
        image: null as any, // Will be handled separately for editing
        logo: partner.logo,
        link: partner.link,
        language: partner.language,
      });
      setPreviewImage(getImageUrl(partner.image) || null);
    }
  }, [partner]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, image: file }));

      // Create preview
      const reader = new FileReader();
      reader.onload = e => {
        setPreviewImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData(prev => ({ ...prev, image: null as any }));
    setPreviewImage(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (isEditing && partner) {
        const updateData: UpdatePartnerRequest = {
          logo: formData.logo,
          link: formData.link,
          language: formData.language,
        };

        // Only include image if a new one was selected
        if (formData.image) {
          updateData.image = formData.image;
        }

        await updatePartner.mutateAsync({
          id: partner._id,
          partnerData: updateData,
        });
      } else {
        await createPartner.mutateAsync(formData);
      }
      onSuccess();
    } catch (error) {
      console.error("Error saving partner:", error);
    }
  };

  const isLoading = createPartner.isPending || updatePartner.isPending;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="image">
            Зображення партнера{" "}
            {!isEditing && <span className="text-red-500">*</span>}
          </Label>
          <div className="flex items-center space-x-4">
            <div className="flex-1">
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                disabled={isLoading}
                className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
              />
            </div>
            {previewImage && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={removeImage}
                disabled={isLoading}
                className="flex items-center space-x-1"
              >
                <X className="h-4 w-4" />
                <span>Видалити</span>
              </Button>
            )}
          </div>

          {previewImage && (
            <div className="mt-2">
              <Image
                src={previewImage}
                alt="Preview"
                width={120}
                height={80}
                className="rounded border"
              />
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="logo">Назва організації *</Label>
          <Input
            id="logo"
            type="text"
            value={formData.logo}
            onChange={e => setFormData({ ...formData, logo: e.target.value })}
            placeholder="Enter organization name"
            required
            maxLength={128}
            disabled={isLoading}
          />
          <p className="text-xs text-gray-500">
            {formData.logo.length}/128 символи
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="link">Посилання на вебсайт *</Label>
          <Input
            id="link"
            type="url"
            value={formData.link}
            onChange={e => setFormData({ ...formData, link: e.target.value })}
            placeholder="https://example.com"
            required
            maxLength={512}
            disabled={isLoading}
          />
          <p className="text-xs text-gray-500">
            {formData.link.length}/512 символи
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="language">Мова *</Label>
          <Select
            value={formData.language}
            onValueChange={(value: "ua" | "en") =>
              setFormData({ ...formData, language: value })
            }
            disabled={isLoading}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select language" />
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
      </div>

      <div className="flex justify-end space-x-3">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {isEditing ? "Оновлення..." : "Створення..."}
            </>
          ) : isEditing ? (
            "Оновити партнера"
          ) : (
            "Створити партнера"
          )}
        </Button>
      </div>
    </form>
  );
};
