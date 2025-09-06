"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ReportForm } from "./ReportForm";
import { ReportDetails } from "./ReportDetails";
import { useDeleteReport } from "@/hooks/reports";
import { Loader2, AlertTriangle } from "lucide-react";
import { Report } from "@/lib/types";

interface ReportsDialogsProps {
  isCreateOpen: boolean;
  isEditOpen: boolean;
  isViewOpen: boolean;
  isDeleteOpen: boolean;
  selectedReport: Report | null;
  onCloseCreate: () => void;
  onCloseEdit: () => void;
  onCloseView: () => void;
  onCloseDelete: () => void;
  onEdit: (report: Report) => void;
  onDelete: (report: Report) => void;
}

export const ReportsDialogs: React.FC<ReportsDialogsProps> = ({
  isCreateOpen,
  isEditOpen,
  isViewOpen,
  isDeleteOpen,
  selectedReport,
  onCloseCreate,
  onCloseEdit,
  onCloseView,
  onCloseDelete,
  onEdit,
  onDelete,
}) => {
  const deleteReport = useDeleteReport();

  const handleDelete = async () => {
    if (selectedReport) {
      try {
        await deleteReport.mutateAsync(selectedReport._id);
        onCloseDelete();
      } catch (error) {
        console.error("Error deleting report:", error);
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
            <DialogTitle>Create New Report</DialogTitle>
            <DialogDescription>
              Add a new monthly report to the system.
            </DialogDescription>
          </DialogHeader>
          <ReportForm onSuccess={handleFormSuccess} onCancel={onCloseCreate} />
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={onCloseEdit}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Report</DialogTitle>
            <DialogDescription>
              Update the report information.
            </DialogDescription>
          </DialogHeader>
          <ReportForm
            report={selectedReport}
            onSuccess={handleFormSuccess}
            onCancel={onCloseEdit}
          />
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={isViewOpen} onOpenChange={onCloseView}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Report Details</DialogTitle>
            <DialogDescription>
              View detailed information about the report.
            </DialogDescription>
          </DialogHeader>
          {selectedReport && (
            <div className="space-y-4">
              <ReportDetails report={selectedReport} />
              <div className="flex justify-end space-x-3 pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={() => {
                    onCloseView();
                    onEdit(selectedReport);
                  }}
                >
                  Edit Report
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    onCloseView();
                    onDelete(selectedReport);
                  }}
                >
                  Delete Report
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
              <span>Delete Report</span>
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this report? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>

          {selectedReport && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm font-medium text-gray-900">
                {selectedReport.month} {selectedReport.year}
              </p>
              <p className="text-sm text-gray-600">
                Language: {selectedReport.language} | Type: {selectedReport.type} | Status: {selectedReport.status}
              </p>
            </div>
          )}

          <div className="flex justify-end space-x-3">
            <Button
              variant="outline"
              onClick={onCloseDelete}
              disabled={deleteReport.isPending}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleteReport.isPending}
            >
              {deleteReport.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete Report"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
