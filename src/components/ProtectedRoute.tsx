"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "admin" | "editor" | "user";
}

export function ProtectedRoute({
  children,
  requiredRole,
}: ProtectedRouteProps) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check if user is authenticated by checking localStorage
        // Since we're using httpOnly cookies, the server will handle auth
        // We'll check if user data exists in localStorage as a fallback
        if (typeof window !== "undefined") {
          const userData = localStorage.getItem("user");
          if (userData) {
            const user = JSON.parse(userData);
            setIsAuthenticated(true);
            setUserRole(user.role);
          } else {
            setIsAuthenticated(false);
            setUserRole(null);
          }
        }
      } catch (error) {
        setIsAuthenticated(false);
        setUserRole(null);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        // Якщо не авторизований, перенаправляємо на login
        router.push("/login");
        return;
      }

      if (requiredRole && userRole !== requiredRole) {
        // Якщо потрібна конкретна роль і у користувача її немає
        if (requiredRole === "admin" && userRole !== "admin") {
          router.push("/dashboard"); // Перенаправляємо на dashboard
          return;
        }
      }
    }
  }, [isAuthenticated, isLoading, userRole, router, requiredRole]);

  // Показуємо loading поки перевіряємо авторизацію
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // Якщо не авторизований, не показуємо контент
  if (!isAuthenticated) {
    return null;
  }

  // Якщо потрібна роль і у користувача її немає, не показуємо контент
  if (requiredRole && userRole !== requiredRole) {
    return null;
  }

  return <>{children}</>;
}
