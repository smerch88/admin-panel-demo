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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Loader2, Save, X } from "lucide-react";
import { UpdateMerchRequest, Merch } from "@/lib/types";

interface MerchModalProps {
  isOpen: boolean;
  onClose: () => void;
  locale: string;
  merchData?: Merch | null;
  onSuccess: () => void;
}

export const MerchModal: React.FC<MerchModalProps> = ({
  isOpen,
  onClose,
  locale,
  merchData,
  onSuccess,
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
    } else {
      setFormData({
        status: "off",
        content: "",
        link: "",
      });
    }
  }, [merchData, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await updateMerch.mutateAsync({
        locale,
        merchData: formData,
      });
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error updating merch:", error);
    }
  };

  const handleClose = () => {
    if (!updateMerch.isPending) {
      onClose();
    }
  };

  const isLoading = updateMerch.isPending;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {merchData ? "Edit Merch Settings" : "Create Merch Settings"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status *</Label>
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
                  <SelectItem value="on">Enabled</SelectItem>
                  <SelectItem value="off">Disabled</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-500">
                When enabled, the merch button will be visible to users
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Button Content *</Label>
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
                {formData.content.length}/100 characters
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="link">Merch Link *</Label>
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
                {formData.link.length}/512 characters
              </p>
            </div>
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
