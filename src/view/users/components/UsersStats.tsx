"use client";

import { useUsers } from "@/hooks/auth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Shield, Edit } from "lucide-react";

export const UsersStats: React.FC = () => {
  const { data: users, isLoading } = useUsers();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map(i => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Loading...</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-1/2 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!users) {
    return null;
  }

  const totalUsers = users.length;
  const adminUsers = users.filter(user => user.role === "admin").length;
  const editorUsers = users.filter(user => user.role === "editor").length;

  const stats = [
    {
      title: "Усього користувачів",
      value: totalUsers,
      icon: Users,
      description: "Всі зареєстровані користувачі",
    },
    {
      title: "Адміністратори",
      value: adminUsers,
      icon: Shield,
      description: "Користувачі-адміністратори",
    },
    {
      title: "Редактори",
      value: editorUsers,
      icon: Edit,
      description: "Користувачі-редактори",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-purple-600">
                {stat.value}
              </div>
              <p className="text-xs text-muted-foreground">
                {stat.description}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};
