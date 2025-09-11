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
import { toast } from "sonner";

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
        toast.success("Report deleted successfully!");
        onCloseDelete();
      } catch (error) {
        toast.error("Failed to delete report");
      }
    }
  };

  const handleFormSuccess = () => {
    onCloseCreate();
    onCloseEdit();
    toast.success("Report saved successfully!");
  };

  return (
    <>
      {/* Create Dialog */}
      <Dialog open={isCreateOpen} onOpenChange={onCloseCreate}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Створити новий звіт</DialogTitle>
            <DialogDescription>
              Додайте новий щомісячний звіт до системи.
            </DialogDescription>
          </DialogHeader>
          <ReportForm onSuccess={handleFormSuccess} onCancel={onCloseCreate} />
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={onCloseEdit}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Редагувати звіт</DialogTitle>
            <DialogDescription>Оновіть інформацію звіту.</DialogDescription>
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
            <DialogTitle>Деталі звіту</DialogTitle>
            <DialogDescription>
              Перегляньте детальну інформацію про звіт.
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
                  Редагувати звіт
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => {
                    onCloseView();
                    onDelete(selectedReport);
                  }}
                >
                  Видалити звіт
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
              <span>Видалити звіт</span>
            </DialogTitle>
            <DialogDescription>
              Ви впевнені, що хочете видалити цей звіт? Цю дію неможливо
              скасувати.
            </DialogDescription>
          </DialogHeader>

          {selectedReport && (
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm font-medium text-gray-900">
                {selectedReport.month} {selectedReport.year}
              </p>
              <p className="text-sm text-gray-600">
                Мова: {selectedReport.language} | Тип: {selectedReport.type} |
                Статус: {selectedReport.status}
              </p>
            </div>
          )}

          <div className="flex justify-end space-x-3">
            <Button
              variant="outline"
              onClick={onCloseDelete}
              disabled={deleteReport.isPending}
            >
              Скасувати
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleteReport.isPending}
            >
              {deleteReport.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Видалення...
                </>
              ) : (
                "Видалити звіт"
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
