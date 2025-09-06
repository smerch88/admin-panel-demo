"use client";

import { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import {
  useCollections,
  useCreateCollection,
  useUpdateCollection,
  useDeleteCollection,
} from "@/hooks/collections";
import {
  Collection,
  CreateCollectionRequest,
  UpdateCollectionRequest,
} from "@/lib/types";
import {
  CollectionsHeader,
  CollectionsStats,
  CollectionsTable,
  CollectionsDialogs,
} from "./components";
import { toast } from "sonner";

export default function CollectionsView() {
  const [selectedLocale, setSelectedLocale] = useState("ua");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isViewOpen, setIsViewOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedCollection, setSelectedCollection] =
    useState<Collection | null>(null);

  const {
    data: collectionsData,
    isLoading,
    refetch,
  } = useCollections(selectedLocale, 1, 50);
  const createCollection = useCreateCollection();
  const updateCollection = useUpdateCollection();
  const deleteCollection = useDeleteCollection();

  // Extract collections from the paginated response
  const collections: Collection[] = collectionsData?.data
    ? [
        ...(collectionsData.data.activeCollections || []),
        ...(collectionsData.data.closedCollections || []),
      ]
    : [];

  const handleCreate = () => {
    setSelectedCollection(null);
    setIsCreateOpen(true);
  };

  const handleEdit = (collection: Collection) => {
    setSelectedCollection(collection);
    setIsEditOpen(true);
  };

  const handleDelete = (collection: Collection) => {
    setSelectedCollection(collection);
    setIsDeleteOpen(true);
  };

  const handleView = (collection: Collection) => {
    setSelectedCollection(collection);
    setIsViewOpen(true);
  };

  const handleCreateSubmit = async (data: CreateCollectionRequest) => {
    try {
      await createCollection.mutateAsync({
        locale: selectedLocale,
        collectionData: data,
      });
      toast.success("Collection created successfully!");
      setIsCreateOpen(false);
      refetch();
    } catch (error) {
      toast.error("Failed to create collection");
      console.error("Create error:", error);
    }
  };

  const handleEditSubmit = async (data: UpdateCollectionRequest) => {
    if (!selectedCollection) return;

    try {
      await updateCollection.mutateAsync({
        locale: selectedLocale,
        id: selectedCollection._id,
        collectionData: data,
      });
      toast.success("Collection updated successfully!");
      setIsEditOpen(false);
      setSelectedCollection(null);
      refetch();
    } catch (error) {
      toast.error("Failed to update collection");
      console.error("Update error:", error);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedCollection) return;

    try {
      await deleteCollection.mutateAsync({
        locale: selectedLocale,
        id: selectedCollection._id,
      });
      toast.success("Collection deleted successfully!");
      setIsDeleteOpen(false);
      setSelectedCollection(null);
      refetch();
    } catch (error) {
      toast.error("Failed to delete collection");
      console.error("Delete error:", error);
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-full">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <CollectionsHeader
            selectedLocale={selectedLocale}
            onLocaleChange={setSelectedLocale}
            onCreate={handleCreate}
          />

          <CollectionsStats collections={collections} />

          <CollectionsTable
            collections={collections}
            selectedLocale={selectedLocale}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </div>
      </div>

      <CollectionsDialogs
        isCreateOpen={isCreateOpen}
        isEditOpen={isEditOpen}
        isViewOpen={isViewOpen}
        isDeleteOpen={isDeleteOpen}
        onCreateClose={() => setIsCreateOpen(false)}
        onEditClose={() => setIsEditOpen(false)}
        onViewClose={() => setIsViewOpen(false)}
        onDeleteClose={() => setIsDeleteOpen(false)}
        selectedCollection={selectedCollection}
        onCreateSubmit={handleCreateSubmit}
        onEditSubmit={handleEditSubmit}
        onDeleteConfirm={handleDeleteConfirm}
        isCreateLoading={createCollection.isPending}
        isEditLoading={updateCollection.isPending}
      />
    </AdminLayout>
  );
}
