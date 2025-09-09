"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Teammate } from "@/lib/types";
import { TeammateDetails } from "./TeammateDetails";
import { TeammateForm } from "./TeammateForm";

interface TeammatesDialogsProps {
  isCreateOpen: boolean;
  isEditOpen: boolean;
  isViewOpen: boolean;
  isDeleteOpen: boolean;
  selectedTeammate: Teammate | null;
  locale: string;
  onCloseCreate: () => void;
  onCloseEdit: () => void;
  onCloseView: () => void;
  onCloseDelete: () => void;
  onEdit: (teammate: Teammate) => void;
  onDelete: (teammate: Teammate) => void;
  onConfirmDelete: () => void;
}

export const TeammatesDialogs: React.FC<TeammatesDialogsProps> = ({
  isCreateOpen,
  isEditOpen,
  isViewOpen,
  isDeleteOpen,
  selectedTeammate,
  locale,
  onCloseCreate,
  onCloseEdit,
  onCloseView,
  onCloseDelete,
  onEdit,
  onDelete,
  onConfirmDelete,
}) => {
  const handleCreateSuccess = () => {
    onCloseCreate();
  };

  const handleEditSuccess = () => {
    onCloseEdit();
  };

  const handleDeleteConfirm = () => {
    onConfirmDelete();
  };

  return (
    <>
      {/* Create Dialog */}
      <Dialog open={isCreateOpen} onOpenChange={onCloseCreate}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Додати нового учасника</DialogTitle>
            <DialogDescription>
              Створіть нового учасника команди, вказавши його інформацію та
              фото.
            </DialogDescription>
          </DialogHeader>
          <TeammateForm
            onSuccess={handleCreateSuccess}
            onCancel={onCloseCreate}
            locale={locale}
          />
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={onCloseEdit}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Редагувати учасника</DialogTitle>
            <DialogDescription>
              Оновіть інформацію та фото учасника команди.
            </DialogDescription>
          </DialogHeader>
          <TeammateForm
            teammate={selectedTeammate}
            onSuccess={handleEditSuccess}
            onCancel={onCloseEdit}
            locale={selectedTeammate?.locale || locale}
          />
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={isViewOpen} onOpenChange={onCloseView}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Деталі учасника</DialogTitle>
            <DialogDescription>
              Перегляньте детальну інформацію про учасника команди.
            </DialogDescription>
          </DialogHeader>
          {selectedTeammate && <TeammateDetails teammate={selectedTeammate} />}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteOpen} onOpenChange={onCloseDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Ви впевнені?</AlertDialogTitle>
            <AlertDialogDescription>
              Цю дію неможливо скасувати. Це назавжди видалить учасника команди
              &quot;{selectedTeammate?.name}&quot; та видалить їхні дані з наших
              серверів.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Скасувати</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-red-600 hover:bg-red-700"
            >
              Видалити
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
