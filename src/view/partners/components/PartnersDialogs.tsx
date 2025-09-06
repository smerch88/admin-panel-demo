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
        onCloseDelete();
      } catch (error) {
        console.error("Error deleting partner:", error);
      }
    }
  };

  const handleFormSuccess = () => {
    onCloseCreate();
    onCloseEdit();
  };

  return (
    <>
      {/* Create Dialog */}
      <Dialog open={isCreateOpen} onOpenChange={onCloseCreate}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Partner</DialogTitle>
            <DialogDescription>
              Add a new partner organization to the system.
            </DialogDescription>
          </DialogHeader>
          <PartnerForm onSuccess={handleFormSuccess} onCancel={onCloseCreate} />
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={onCloseEdit}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Partner</DialogTitle>
            <DialogDescription>
              Update the partner information.
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
            <DialogTitle>Partner Details</DialogTitle>
            <DialogDescription>
              View detailed information about the partner.
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
                  Edit Partner
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    onCloseView();
                    onDelete(selectedPartner);
                  }}
                >
                  Delete Partner
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
              <span>Delete Partner</span>
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this partner? This action cannot
              be undone.
            </DialogDescription>
          </DialogHeader>

          {selectedPartner && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm font-medium text-gray-900">
                {selectedPartner.logo}
              </p>
              <p className="text-sm text-gray-600">
                Language: {selectedPartner.language} | Link:{" "}
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
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deletePartner.isPending}
            >
              {deletePartner.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete Partner"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

