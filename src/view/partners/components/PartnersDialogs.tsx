"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { PartnerForm } from "./PartnerForm";
import { PartnerDetails } from "./PartnerDetails";
import { useDeletePartner } from "@/hooks/partners";
import { Loader2, AlertTriangle } from "lucide-react";
import { Partner } from "@/lib/types";
import { toast } from "sonner";

interface PartnersDialogsProps {
  isCreateOpen: boolean;
  isEditOpen: boolean;
  isViewOpen: boolean;
  isDeleteOpen: boolean;
  selectedPartner: Partner | null;
  onCloseCreate: () => void;
  onCloseEdit: () => void;
  onCloseView: () => void;
  onCloseDelete: () => void;
  onEdit: (partner: Partner) => void;
  onDelete: (partner: Partner) => void;
}

export const PartnersDialogs: React.FC<PartnersDialogsProps> = ({
  isCreateOpen,
  isEditOpen,
  isViewOpen,
  isDeleteOpen,
  selectedPartner,
  onCloseCreate,
  onCloseEdit,
  onCloseView,
  onCloseDelete,
  onEdit,
  onDelete,
}) => {
  const deletePartner = useDeletePartner();

  const handleDelete = async () => {
    if (selectedPartner) {
      try {
        await deletePartner.mutateAsync(selectedPartner._id);
        toast.success("Partner deleted successfully!");
        onCloseDelete();
      } catch (error) {
        toast.error("Failed to delete partner");
        console.error("Error deleting partner:", error);
      }
    }
  };

  const handleFormSuccess = () => {
    onCloseCreate();
    onCloseEdit();
    toast.success("Partner saved successfully!");
  };

  return (
    <>
      {/* Create Dialog */}
      <Dialog open={isCreateOpen} onOpenChange={onCloseCreate}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Створити нового партнера</DialogTitle>
            <DialogDescription>
              Додайте нову партнерську організацію до системи.
            </DialogDescription>
          </DialogHeader>
          <PartnerForm onSuccess={handleFormSuccess} onCancel={onCloseCreate} />
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={onCloseEdit}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Редагувати партнера</DialogTitle>
            <DialogDescription>
              Оновіть інформацію про партнера.
            </DialogDescription>
          </DialogHeader>
          <PartnerForm
            partner={selectedPartner}
            onSuccess={handleFormSuccess}
            onCancel={onCloseEdit}
          />
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={isViewOpen} onOpenChange={onCloseView}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Деталі партнера</DialogTitle>
            <DialogDescription>
              Перегляньте детальну інформацію про партнера.
            </DialogDescription>
          </DialogHeader>
          {selectedPartner && (
            <div className="space-y-4">
              <PartnerDetails partner={selectedPartner} />
              <div className="flex justify-end space-x-3 pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={() => {
                    onCloseView();
                    onEdit(selectedPartner);
                  }}
                >
                  Редагувати партнера
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    onCloseView();
                    onDelete(selectedPartner);
                  }}
                >
                  Видалити партнера
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteOpen} onOpenChange={onCloseDelete}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-red-500" />
              <span>Видалити партнера</span>
            </DialogTitle>
            <DialogDescription>
              Ви впевнені, що хочете видалити цього партнера? Цю дію неможливо
              скасувати.
            </DialogDescription>
          </DialogHeader>

          {selectedPartner && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm font-medium text-gray-900">
                {selectedPartner.logo}
              </p>
              <p className="text-sm text-gray-600">
                Мова: {selectedPartner.language} | Посилання:{" "}
                {selectedPartner.link}
              </p>
            </div>
          )}

          <div className="flex justify-end space-x-3">
            <Button
              variant="outline"
              onClick={onCloseDelete}
              disabled={deletePartner.isPending}
            >
              Скасувати
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deletePartner.isPending}
            >
              {deletePartner.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Видалення...
                </>
              ) : (
                "Видалити партнера"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
