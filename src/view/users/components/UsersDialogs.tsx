"use client";

import { useState, useEffect } from "react";
import { useRegister, useUpdateUser } from "@/hooks/auth";
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
  Loader2,
  Save,
  X,
  UserPlus,
  User,
  Mail,
  Lock,
  Shield,
} from "lucide-react";
import {
  User as UserType,
  RegisterRequest,
  UpdateUserRequest,
} from "@/lib/types";
import { toast } from "sonner";

interface UsersDialogsProps {
  isCreateDialogOpen: boolean;
  isEditDialogOpen: boolean;
  isDeleteDialogOpen: boolean;
  onCloseCreateDialog: () => void;
  onCloseEditDialog: () => void;
  onCloseDeleteDialog: () => void;
  onCreateSuccess: () => void;
  onEditSuccess: () => void;
  onConfirmDelete: () => void;
  selectedUser: UserType | null;
}

export const UsersDialogs: React.FC<UsersDialogsProps> = ({
  isCreateDialogOpen,
  isEditDialogOpen,
  isDeleteDialogOpen,
  onCloseCreateDialog,
  onCloseEditDialog,
  onCloseDeleteDialog,
  onCreateSuccess,
  onEditSuccess,
  onConfirmDelete,
  selectedUser,
}) => {
  const register = useRegister();
  const updateUser = useUpdateUser();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "editor" as "admin" | "editor",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (selectedUser && isEditDialogOpen) {
      setFormData({
        name: selectedUser.name,
        email: selectedUser.email,
        password: "",
        role: selectedUser.role,
      });
    } else if (isCreateDialogOpen) {
      setFormData({
        name: "",
        email: "",
        password: "",
        role: "editor",
      });
    }
  }, [selectedUser, isEditDialogOpen, isCreateDialogOpen]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (isCreateDialogOpen && !formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (formData.password && formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast.error("Please fix the highlighted errors");
      return;
    }

    try {
      const userData: RegisterRequest = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      };
      await register.mutateAsync(userData);
      toast.success("User created successfully!");
      onCreateSuccess();
    } catch (error) {
      toast.error("Failed to create user");
      throw error;
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm() || !selectedUser) {
      if (!validateForm()) toast.error("Please fix the highlighted errors");
      return;
    }

    try {
      const userData: UpdateUserRequest = {
        name: formData.name,
        email: formData.email,
        role: formData.role,
        ...(formData.password && { password: formData.password }),
      };
      await updateUser.mutateAsync({
        userId: selectedUser._id,
        userData,
      });
      toast.success("User updated successfully!");
      onEditSuccess();
    } catch (error) {
      toast.error("Failed to update user");
      throw error;
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
  };

  const handleCloseCreate = () => {
    setErrors({});
    onCloseCreateDialog();
  };

  const handleCloseEdit = () => {
    setErrors({});
    onCloseEditDialog();
  };

  const isCreateLoading = register.isPending;
  const isEditLoading = updateUser.isPending;

  return (
    <>
      {/* Create User Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={handleCloseCreate}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <UserPlus className="h-5 w-5" />
              <span>Створити нового користувача</span>
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleCreateSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="create-name"
                className="flex items-center space-x-2"
              >
                <User className="h-4 w-4" />
                <span>Ім&apos;я *</span>
              </Label>
              <Input
                id="create-name"
                value={formData.name}
                onChange={e => handleInputChange("name", e.target.value)}
                placeholder="Введіть ім'я"
                disabled={isCreateLoading}
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="create-email"
                className="flex items-center space-x-2"
              >
                <Mail className="h-4 w-4" />
                <span>Е-пошта *</span>
              </Label>
              <Input
                id="create-email"
                type="email"
                value={formData.email}
                onChange={e => handleInputChange("email", e.target.value)}
                placeholder="Введіть е-пошту"
                disabled={isCreateLoading}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="create-password"
                className="flex items-center space-x-2"
              >
                <Lock className="h-4 w-4" />
                <span>Пароль *</span>
              </Label>
              <Input
                id="create-password"
                type="password"
                value={formData.password}
                onChange={e => handleInputChange("password", e.target.value)}
                placeholder="Введіть пароль"
                disabled={isCreateLoading}
                className={errors.password ? "border-red-500" : ""}
              />
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="create-role"
                className="flex items-center space-x-2"
              >
                <Shield className="h-4 w-4" />
                <span>Роль *</span>
              </Label>
              <Select
                value={formData.role}
                onValueChange={value => handleInputChange("role", value)}
                disabled={isCreateLoading}
              >
                <SelectTrigger className={errors.role ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="editor">Editor</SelectItem>
                </SelectContent>
              </Select>
              {errors.role && (
                <p className="text-sm text-red-500">{errors.role}</p>
              )}
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={handleCloseCreate}
                disabled={isCreateLoading}
                className="flex items-center space-x-2"
              >
                <X className="h-4 w-4" />
                <span>Скасувати</span>
              </Button>
              <Button
                type="submit"
                disabled={isCreateLoading}
                className="flex items-center space-x-2"
              >
                {isCreateLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Створення...</span>
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    <span>Створити користувача</span>
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={handleCloseEdit}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <User className="h-5 w-5" />
              <span>Редагувати користувача</span>
            </DialogTitle>
          </DialogHeader>

          <form onSubmit={handleEditSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="edit-name"
                className="flex items-center space-x-2"
              >
                <User className="h-4 w-4" />
                <span>Ім&apos;я *</span>
              </Label>
              <Input
                id="edit-name"
                value={formData.name}
                onChange={e => handleInputChange("name", e.target.value)}
                placeholder="Введіть ім'я"
                disabled={isEditLoading}
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && (
                <p className="text-sm text-red-500">{errors.name}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="edit-email"
                className="flex items-center space-x-2"
              >
                <Mail className="h-4 w-4" />
                <span>Е-пошта *</span>
              </Label>
              <Input
                id="edit-email"
                type="email"
                value={formData.email}
                onChange={e => handleInputChange("email", e.target.value)}
                placeholder="Введіть е-пошту"
                disabled={isEditLoading}
                className={errors.email ? "border-red-500" : ""}
              />
              {errors.email && (
                <p className="text-sm text-red-500">{errors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="edit-password"
                className="flex items-center space-x-2"
              >
                <Lock className="h-4 w-4" />
                <span>Пароль (введіть поточний або новий пароль)</span>
              </Label>
              <Input
                id="edit-password"
                type="password"
                value={formData.password}
                onChange={e => handleInputChange("password", e.target.value)}
                placeholder="Введіть новий пароль"
                disabled={isEditLoading}
                className={errors.password ? "border-red-500" : ""}
              />
              {errors.password && (
                <p className="text-sm text-red-500">{errors.password}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="edit-role"
                className="flex items-center space-x-2"
              >
                <Shield className="h-4 w-4" />
                <span>Роль *</span>
              </Label>
              <Select
                value={formData.role}
                onValueChange={value => handleInputChange("role", value)}
                disabled={isEditLoading}
              >
                <SelectTrigger className={errors.role ? "border-red-500" : ""}>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="editor">Editor</SelectItem>
                </SelectContent>
              </Select>
              {errors.role && (
                <p className="text-sm text-red-500">{errors.role}</p>
              )}
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={handleCloseEdit}
                disabled={isEditLoading}
                className="flex items-center space-x-2"
              >
                <X className="h-4 w-4" />
                <span>Скасувати</span>
              </Button>
              <Button
                type="submit"
                disabled={isEditLoading}
                className="flex items-center space-x-2"
              >
                {isEditLoading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Оновлення...</span>
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    <span>Оновити користувача</span>
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete User Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={onCloseDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Видалити користувача</AlertDialogTitle>
            <AlertDialogDescription>
              Ви впевнені, що хочете видалити &quot;{selectedUser?.name}&quot;?
              Цю дію неможливо скасувати.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Скасувати</AlertDialogCancel>
            <AlertDialogAction
              onClick={onConfirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Видалити користувача
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};
