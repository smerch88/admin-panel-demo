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
            <DialogTitle>Add New Teammate</DialogTitle>
            <DialogDescription>
              Create a new team member with their information and photo.
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
            <DialogTitle>Edit Teammate</DialogTitle>
            <DialogDescription>
              Update the team member&apos;s information and photo.
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
            <DialogTitle>Teammate Details</DialogTitle>
            <DialogDescription>
              View detailed information about the team member.
            </DialogDescription>
          </DialogHeader>
          {selectedTeammate && <TeammateDetails teammate={selectedTeammate} />}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteOpen} onOpenChange={onCloseDelete}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              teammate &quot;{selectedTeammate?.name}&quot; and remove their
              data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteConfirm}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
