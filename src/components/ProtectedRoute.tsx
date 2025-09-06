"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useCurrentUser } from "@/hooks/auth";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "admin" | "editor" | "user";
}

export function ProtectedRoute({
  children,
  requiredRole,
}: ProtectedRouteProps) {
  const router = useRouter();
  const { data: currentUser, isLoading, error } = useCurrentUser();
  const [isClient, setIsClient] = useState(false);

  // Prevent hydration mismatch by only running on client
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient || isLoading) return;

    // If there's an error or no user data, redirect to login
    if (error || !currentUser) {
      router.push("/login");
      return;
    }

    // Check role requirements
    if (requiredRole && currentUser.role !== requiredRole) {
      if (requiredRole === "admin" && currentUser.role !== "admin") {
        router.push("/dashboard"); // Redirect non-admin users to dashboard
        return;
      }
    }
  }, [currentUser, isLoading, error, router, requiredRole, isClient]);

  // Show loading spinner while checking authentication or during hydration
  if (!isClient || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  // If not authenticated, don't show content
  if (error || !currentUser) {
    return null;
  }

  // If required role and user doesn't have it, don't show content
  if (requiredRole && currentUser.role !== requiredRole) {
    return null;
  }

  return <>{children}</>;
}
