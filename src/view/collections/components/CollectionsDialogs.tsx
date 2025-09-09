"use client";

import {
  Collection,
  CreateCollectionRequest,
  UpdateCollectionRequest,
} from "@/lib/types";
import { CollectionForm } from "@/view/collections/components/CollectionForm";
import { CollectionDetails } from "@/view/collections/components/CollectionDetails";
import {
  Dialog,
  DialogContent,
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

interface CollectionsDialogsProps {
  // Dialog states
  isCreateOpen: boolean;
  isEditOpen: boolean;
  isViewOpen: boolean;
  isDeleteOpen: boolean;

  // Dialog handlers
  onCreateClose: () => void;
  onEditClose: () => void;
  onViewClose: () => void;
  onDeleteClose: () => void;

  // Data
  selectedCollection: Collection | null;

  // Form handlers
  onCreateSubmit: (data: CreateCollectionRequest) => void;
  onEditSubmit: (data: UpdateCollectionRequest) => void;
  onDeleteConfirm: () => void;

  // Loading states
  isCreateLoading: boolean;
  isEditLoading: boolean;
}

export const CollectionsDialogs: React.FC<CollectionsDialogsProps> = ({
  isCreateOpen,
  isEditOpen,
  isViewOpen,
  isDeleteOpen,
  onCreateClose,
  onEditClose,
  onViewClose,
  onDeleteClose,
  selectedCollection,
  onCreateSubmit,
  onEditSubmit,
  onDeleteConfirm,
  isCreateLoading,
  isEditLoading,
}) => {
  return (
    <>
      {/* Create Collection Dialog */}
      <Dialog open={isCreateOpen} onOpenChange={onCreateClose}>
        <DialogContent className="max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Створити новий збір</DialogTitle>
          </DialogHeader>
          <CollectionForm
            onSubmit={(
              data: CreateCollectionRequest | UpdateCollectionRequest
            ) => onCreateSubmit(data as CreateCollectionRequest)}
            onCancel={onCreateClose}
            isLoading={isCreateLoading}
            mode="create"
          />
        </DialogContent>
      </Dialog>

      {/* Edit Collection Dialog */}
      <Dialog open={isEditOpen} onOpenChange={onEditClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Редагувати збір</DialogTitle>
          </DialogHeader>
          {selectedCollection && (
            <CollectionForm
              collection={selectedCollection}
              onSubmit={(
                data: CreateCollectionRequest | UpdateCollectionRequest
              ) => onEditSubmit(data as UpdateCollectionRequest)}
              onCancel={onEditClose}
              isLoading={isEditLoading}
              mode="edit"
            />
          )}
        </DialogContent>
      </Dialog>

      {/* View Collection Dialog */}
      <Dialog open={isViewOpen} onOpenChange={onViewClose}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Деталі збору</DialogTitle>
          </DialogHeader>
          {selectedCollection && (
            <CollectionDetails collection={selectedCollection} />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteOpen} onOpenChange={onDeleteClose}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Ви впевнені?</AlertDialogTitle>
            <AlertDialogDescription>
              Цю дію неможливо скасувати. Це назавжди видалить збір &quot;
              {selectedCollection?.title}&quot;.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Скасувати</AlertDialogCancel>
            <AlertDialogAction
              onClick={onDeleteConfirm}
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
