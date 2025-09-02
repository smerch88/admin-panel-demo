"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useLogout } from "@/hooks/auth";
import {
  LayoutDashboard,
  FolderOpen,
  FileText,
  Users,
  ShoppingBag,
  UserCheck,
  Settings,
  LogOut,
} from "lucide-react";

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Collections", href: "/collections", icon: FolderOpen },
  { name: "Reports", href: "/reports", icon: FileText },
  { name: "Partners", href: "/partners", icon: Users },
  { name: "Merch", href: "/merch", icon: ShoppingBag },
  { name: "Teammates", href: "/teammates", icon: UserCheck },
  { name: "Users", href: "/users", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const logout = useLogout();

  const handleLogout = async () => {
    try {
      await logout.mutateAsync();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="flex h-screen w-64 flex-col bg-white border-r border-gray-200">
      {/* Logo */}
      <div className="flex h-16 items-center justify-center border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-900">Inharmony Admin</h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map(item => {
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
          {logout.isPending ? "Logging out..." : "Logout"}
        </Button>
      </div>
    </div>
  );
}
