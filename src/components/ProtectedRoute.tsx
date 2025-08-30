"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "admin" | "editor" | "user";
}

export function ProtectedRoute({
  children,
  requiredRole,
}: ProtectedRouteProps) {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        // Якщо не авторизований, перенаправляємо на login
        router.push("/login");
        return;
      }

      if (requiredRole && user?.role !== requiredRole) {
        // Якщо потрібна конкретна роль і у користувача її немає
        if (requiredRole === "admin" && user?.role !== "admin") {
          router.push("/"); // Перенаправляємо на головну
          return;
        }
      }
    }
  }, [isAuthenticated, isLoading, user, router, requiredRole]);

  // Показуємо loading поки перевіряємо авторизацію
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // Якщо не авторизований, не показуємо контент
  if (!isAuthenticated) {
    return null;
  }

  // Якщо потрібна роль і у користувача її немає, не показуємо контент
  if (requiredRole && user?.role !== requiredRole) {
    return null;
  }

  return <>{children}</>;
}
