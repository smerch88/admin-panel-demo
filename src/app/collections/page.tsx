"use client";

import { useState } from "react";
import { AdminLayout } from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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

import { CollectionForm } from "@/components/collections/CollectionForm";
import { CollectionDetails } from "@/components/collections/CollectionDetails";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";

export default function CollectionsPage() {
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
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Collections</h1>
              <p className="text-gray-600 mt-2">
                Manage your fundraising collections and campaigns
              </p>
            </div>

            <div className="flex items-center space-x-4">
              {/* Locale Switcher */}
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700">
                  Language:
                </span>
                <div className="flex bg-white rounded-lg shadow-sm border">
                  {["ua", "en"].map(locale => (
                    <button
                      key={locale}
                      onClick={() => setSelectedLocale(locale)}
                      className={`px-3 py-1 text-sm font-medium rounded-md transition-colors ${
                        selectedLocale === locale
                          ? "bg-indigo-600 text-white"
                          : "text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {locale.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Create Button */}
              <Button
                onClick={handleCreate}
                className="flex items-center space-x-2"
              >
                <Plus className="h-4 w-4" />
                <span>Create Collection</span>
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Collections
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{collections.length}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Active Collections
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {collections.filter(c => c.status === "active").length}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Closed Collections
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-red-600">
                  {collections.filter(c => c.status === "closed").length}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Raised
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  $
                  {collections
                    .reduce((sum, c) => sum + c.collected, 0)
                    .toLocaleString()}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Collections Table */}
          <Card>
            <CardHeader>
              <CardTitle>
                Collections ({selectedLocale.toUpperCase()})
              </CardTitle>
            </CardHeader>
            <CardContent>
              {collections.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Image</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Collected</TableHead>
                      <TableHead>Target</TableHead>
                      <TableHead>Days Left</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {collections.map(collection => (
                      <TableRow key={collection._id}>
                        <TableCell>
                          {collection.image &&
                          collection.image.length > 0 &&
                          collection.image[0].url &&
                          collection.image[0].url.trim() !== "" ? (
                            <Image
                              src={collection.image[0].url}
                              alt={collection.title}
                              width={48}
                              height={48}
                              className="object-cover rounded border"
                            />
                          ) : (
                            <div className="w-12 h-12 bg-gray-200 rounded border flex items-center justify-center">
                              <span className="text-gray-400 text-xs">
                                No img
                              </span>
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="font-medium">
                          {collection.title}
                        </TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                              collection.status === "active"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {collection.status}
                          </span>
                        </TableCell>
                        <TableCell>{collection.type}</TableCell>
                        <TableCell>
                          ${collection.collected.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          ${collection.target.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          {collection.days ? `${collection.days} days` : "N/A"}
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleView(collection)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleEdit(collection)}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => handleDelete(collection)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8">
                  <p className="text-gray-500">
                    No collections found for this locale.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Create Collection Dialog */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className=" max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Collection</DialogTitle>
          </DialogHeader>
          <CollectionForm
            onSubmit={(
              data: CreateCollectionRequest | UpdateCollectionRequest
            ) => handleCreateSubmit(data as CreateCollectionRequest)}
            onCancel={() => setIsCreateOpen(false)}
            isLoading={createCollection.isPending}
            mode="create"
          />
        </DialogContent>
      </Dialog>

      {/* Edit Collection Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Collection</DialogTitle>
          </DialogHeader>
          {selectedCollection && (
            <CollectionForm
              collection={selectedCollection}
              onSubmit={(
                data: CreateCollectionRequest | UpdateCollectionRequest
              ) => handleEditSubmit(data as UpdateCollectionRequest)}
              onCancel={() => setIsEditOpen(false)}
              isLoading={updateCollection.isPending}
              mode="edit"
            />
          )}
        </DialogContent>
      </Dialog>

      {/* View Collection Dialog */}
      <Dialog open={isViewOpen} onOpenChange={setIsViewOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Collection Details</DialogTitle>
          </DialogHeader>
          {selectedCollection && (
            <CollectionDetails collection={selectedCollection} />
          )}
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the
              collection &quot;{selectedCollection?.title}&quot;.
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
    </AdminLayout>
  );
}
