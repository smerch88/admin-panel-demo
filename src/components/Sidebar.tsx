"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useLogout, useCurrentUser } from "@/hooks/auth";
import {
  LayoutDashboard,
  FolderOpen,
  FileText,
  Users,
  ShoppingBag,
  UserCheck,
  Settings,
  LogOut,
  BarChart3,
} from "lucide-react";

const navigation = [
  { name: "Збори", href: "/collections", icon: FolderOpen },
  { name: "Звіти", href: "/reports", icon: FileText },
  { name: "Партнери", href: "/partners", icon: Users },
  { name: "Мерч", href: "/merch", icon: ShoppingBag },
  { name: "Команда", href: "/teammates", icon: UserCheck },
  { name: "Статистика", href: "/stats", icon: BarChart3 },
  { name: "Користувачі", href: "/users", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const logout = useLogout();
  const { data: currentUser } = useCurrentUser();

  const handleLogout = async () => {
    try {
      await logout.mutateAsync();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  // Filter navigation based on user role
  const filteredNavigation = navigation.filter(item => {
    // Only admins can see the Users page
    if (item.name === "Користувачі") {
      return currentUser?.role === "admin";
    }
    return true;
  });

  return (
    <div className="flex h-screen w-64 flex-col bg-white border-r border-gray-200">
      {/* Logo */}
      <div className="flex h-16 items-center justify-center border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-900">ІнХармоні.ЮА</h1>
      </div>

      {/* User Profile */}
      {currentUser && (
        <div className="border-b border-gray-200 p-4">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100">
              <span className="text-sm font-medium text-indigo-700">
                {currentUser.name.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {currentUser.name}
              </p>
              <p className="text-xs text-gray-500 truncate">
                {currentUser.email}
              </p>
              <div className="flex items-center mt-1">
                <span
                  className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                    currentUser.role === "admin"
                      ? "bg-[#5D00A3] text-[#EDDCFF]"
                      : "bg-[#EDDCFF] text-[#5D00A3]"
                  }`}
                >
                  {currentUser.role === "admin" ? "Admin" : "Editor"}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {filteredNavigation.map(item => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                "flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors",
                isActive
                  ? "bg-indigo-100 text-indigo-700"
                  : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
              )}
            >
              <item.icon
                className={cn(
                  "mr-3 h-5 w-5",
                  isActive ? "text-indigo-500" : "text-gray-400"
                )}
              />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="border-t border-gray-200 p-3">
        <Button
          onClick={handleLogout}
          disabled={logout.isPending}
          variant="outline"
          className="w-full justify-start"
        >
          <LogOut className="mr-3 h-5 w-5" />
          {logout.isPending ? "Вихід із системи..." : "Вийти"}
        </Button>
      </div>
    </div>
  );
}
