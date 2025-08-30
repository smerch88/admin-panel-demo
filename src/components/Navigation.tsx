"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useLogout } from "@/hooks";
import { useRouter } from "next/navigation";

export function Navigation() {
  const { user, isAuthenticated } = useAuth();
  const logout = useLogout();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout.mutateAsync();
      router.push("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-gray-900">Admin Panel</h1>
          </div>

          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-700">
              <span className="font-medium">{user?.name}</span>
              <span className="mx-2">•</span>
              <span className="capitalize">{user?.role}</span>
            </div>

            <button
              onClick={handleLogout}
              disabled={logout.isPending}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium disabled:opacity-50"
            >
              {logout.isPending ? "Вихід..." : "Вихід"}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
