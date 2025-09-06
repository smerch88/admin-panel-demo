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
  fedPeople: "People Fed",
  providedWithClothing: "Provided with Clothing",
  providedWithWater: "Supplied with Water",
  receivedMedications: "Received Medicines",
  fedAnimals: "Animals Fed",
  providedWithElectricity: "Provided with Electricity",
};

const statDescriptions = {
  fedPeople: "Number of people who received food assistance",
  providedWithClothing: "Number of people provided with clothing",
  providedWithWater: "Number of people supplied with water",
  receivedMedications: "Number of people who received medical supplies",
  fedAnimals: "Number of animals that received food",
  providedWithElectricity: "Number of people provided with electricity",
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
      return;
    }

    try {
      await updateStats.mutateAsync(formData);
      onEditSuccess();
    } catch (error) {
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
    <Dialog open={isEditDialogOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Statistics</DialogTitle>
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
                  <span>Saving...</span>
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  <span>Save Changes</span>
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

