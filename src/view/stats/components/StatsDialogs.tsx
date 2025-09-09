"use client";

import { useState, useEffect } from "react";
import { useUpdateStats } from "@/hooks/stats";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Loader2,
  Save,
  X,
  Users,
  Shirt,
  Droplets,
  Pill,
  Heart,
  Zap,
} from "lucide-react";
import { Stats, UpdateStatsRequest } from "@/lib/types";
import { toast } from "sonner";

interface StatsDialogsProps {
  isEditDialogOpen: boolean;
  onCloseEditDialog: () => void;
  onEditSuccess: () => void;
  statsData?: Stats | null;
}

const statIcons = {
  fedPeople: Users,
  providedWithClothing: Shirt,
  providedWithWater: Droplets,
  receivedMedications: Pill,
  fedAnimals: Heart,
  providedWithElectricity: Zap,
};

const statLabels = {
  fedPeople: "Годування людей",
  providedWithClothing: "Надано одяг",
  providedWithWater: "Забезпечено водою",
  receivedMedications: "Отримано ліки",
  fedAnimals: "Годування тварин",
  providedWithElectricity: "Надано електрику",
};

const statDescriptions = {
  fedPeople: "Кількість людей, які отримали продовольчу допомогу",
  providedWithClothing: "Кількість людей, яким надали одяг",
  providedWithWater: "Кількість людей, забезпечених водою",
  receivedMedications: "Кількість людей, які отримали медичні засоби",
  fedAnimals: "Кількість тварин, які отримали їжу",
  providedWithElectricity: "Кількість людей, яким надали електрику",
};

export const StatsDialogs: React.FC<StatsDialogsProps> = ({
  isEditDialogOpen,
  onCloseEditDialog,
  onEditSuccess,
  statsData,
}) => {
  const updateStats = useUpdateStats();

  const [formData, setFormData] = useState<UpdateStatsRequest>({
    fedPeople: 0,
    providedWithClothing: 0,
    providedWithWater: 0,
    receivedMedications: 0,
    fedAnimals: 0,
    providedWithElectricity: 0,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (statsData && isEditDialogOpen) {
      setFormData({
        fedPeople: statsData.fedPeople.amount,
        providedWithClothing: statsData.providedWithClothing.amount,
        providedWithWater: statsData.providedWithWater.amount,
        receivedMedications: statsData.receivedMedications.amount,
        fedAnimals: statsData.fedAnimals.amount,
        providedWithElectricity: statsData.providedWithElectricity.amount,
      });
    }
  }, [statsData, isEditDialogOpen]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    Object.entries(formData).forEach(([key, value]) => {
      if (value < 0) {
        newErrors[key] = "Value must be 0 or greater";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix invalid values");
      return;
    }

    try {
      await updateStats.mutateAsync(formData);
      toast.success("Stats updated successfully!");
      onEditSuccess();
    } catch (error) {
      toast.error("Failed to update stats");
      console.error("Error updating stats:", error);
    }
  };

  const handleInputChange = (key: keyof UpdateStatsRequest, value: string) => {
    const numValue = parseInt(value) || 0;
    setFormData(prev => ({ ...prev, [key]: numValue }));
  };

  const handleClose = () => {
    setErrors({});
    onCloseEditDialog();
  };

  const isLoading = updateStats.isPending;

  return (
    <Dialog
      open={isEditDialogOpen}
      onOpenChange={open => {
        if (!open) handleClose();
      }}
    >
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Редагувати статистику</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(formData).map(([key, value]) => {
              const Icon = statIcons[key as keyof typeof statIcons];
              const label = statLabels[key as keyof typeof statLabels];
              const description =
                statDescriptions[key as keyof typeof statDescriptions];

              return (
                <div key={key} className="space-y-2">
                  <Label htmlFor={key} className="flex items-center space-x-2">
                    <Icon className="h-4 w-4" />
                    <span>{label} *</span>
                  </Label>
                  <Input
                    id={key}
                    type="number"
                    min="0"
                    value={value}
                    onChange={e =>
                      handleInputChange(
                        key as keyof UpdateStatsRequest,
                        e.target.value
                      )
                    }
                    placeholder="0"
                    disabled={isLoading}
                    className={errors[key] ? "border-red-500" : ""}
                  />
                  {errors[key] && (
                    <p className="text-sm text-red-500">{errors[key]}</p>
                  )}
                  <p className="text-xs text-gray-500">{description}</p>
                </div>
              );
            })}
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={handleClose}
              disabled={isLoading}
              className="flex items-center space-x-2"
            >
              <X className="h-4 w-4" />
              <span>Скасувати</span>
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
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
