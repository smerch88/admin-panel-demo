"use client";

import { useState, useEffect } from "react";
import { useCreateTeammate, useUpdateTeammate } from "@/hooks/teammates";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Upload, X } from "lucide-react";
import {
  Teammate,
  CreateTeammateRequest,
  UpdateTeammateRequest,
} from "@/lib/types";
import { SafeImage } from "@/components/common";
import { getImageUrl } from "@/lib/utils";

interface TeammateFormProps {
  teammate?: Teammate | null;
  onSuccess: () => void;
  onCancel: () => void;
  locale: string;
}

const LANGUAGES = [
  { value: "ua", label: "Українська" },
  { value: "en", label: "English" },
];

export const TeammateForm: React.FC<TeammateFormProps> = ({
  teammate,
  onSuccess,
  onCancel,
  locale,
}) => {
  const isEditing = !!teammate;
  const createTeammate = useCreateTeammate();
  const updateTeammate = useUpdateTeammate();

  const [formData, setFormData] = useState<CreateTeammateRequest>({
    name: "",
    role: "",
    description: "",
    image: null as any,
    locale: locale as "en" | "ua",
  });

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (teammate) {
      setFormData({
        name: teammate.name,
        role: teammate.role,
        description: teammate.description,
        image: null as any, // Will be handled separately for editing
        locale: teammate.locale || (locale as "en" | "ua"),
      });
      setPreviewImage(getImageUrl(teammate.image) || null);
    }
  }, [teammate]);

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

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.length > 24) {
      newErrors.name = "Name must be 24 characters or less";
    }

    if (!formData.role.trim()) {
      newErrors.role = "Role is required";
    } else if (formData.role.length > 48) {
      newErrors.role = "Role must be 48 characters or less";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    } else if (formData.description.length > 320) {
      newErrors.description = "Description must be 320 characters or less";
    }

    if (!isEditing && !formData.image) {
      newErrors.image = "Image is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    try {
      if (isEditing && teammate) {
        const updateData: UpdateTeammateRequest = {
          name: formData.name,
          role: formData.role,
          description: formData.description,
        };

        // Only include image if a new one was selected
        if (formData.image) {
          updateData.image = formData.image;
        }

        await updateTeammate.mutateAsync({
          id: teammate._id,
          locale: teammate.locale || locale,
          teammateData: updateData,
        });
      } else {
        await createTeammate.mutateAsync(formData);
      }
      onSuccess();
    } catch (error) {
      throw error;
    }
  };

  const isLoading = createTeammate.isPending || updateTeammate.isPending;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="image">
            Фото профілю {!isEditing && <span className="text-red-500">*</span>}
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
          {errors.image && (
            <p className="text-sm text-red-500">{errors.image}</p>
          )}

          {previewImage && (
            <div className="mt-2">
              <SafeImage
                src={previewImage}
                alt="Preview"
                width={120}
                height={120}
                className="rounded-full border"
                fallbackText="Preview"
              />
            </div>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">Ім&apos;я *</Label>
          <Input
            id="name"
            type="text"
            value={formData.name}
            onChange={e => setFormData({ ...formData, name: e.target.value })}
            placeholder="Enter teammate name"
            required
            maxLength={24}
            disabled={isLoading}
            className={errors.name ? "border-red-500" : ""}
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>{errors.name || ""}</span>
            <span>{formData.name.length}/24 символи</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="role">Роль *</Label>
          <Input
            id="role"
            type="text"
            value={formData.role}
            onChange={e => setFormData({ ...formData, role: e.target.value })}
            placeholder="Enter teammate role"
            required
            maxLength={48}
            disabled={isLoading}
            className={errors.role ? "border-red-500" : ""}
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>{errors.role || ""}</span>
            <span>{formData.role.length}/48 символи</span>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="description">Опис *</Label>
          <Textarea
            id="description"
            value={formData.description}
            onChange={e =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="Enter teammate description"
            required
            maxLength={320}
            disabled={isLoading}
            rows={4}
            className={errors.description ? "border-red-500" : ""}
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>{errors.description || ""}</span>
            <span>{formData.description.length}/320 символи</span>
          </div>
        </div>

        {!isEditing && (
          <div className="space-y-2">
            <Label htmlFor="locale">Мова *</Label>
            <Select
              value={formData.locale}
              onValueChange={(value: "ua" | "en") =>
                setFormData({ ...formData, locale: value })
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
        )}
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
            "Оновити учасника"
          ) : (
            "Створити учасника"
          )}
        </Button>
      </div>
    </form>
  );
};
