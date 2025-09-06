"use client";

import { ReactNode } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface LoginLayoutProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
}

export const LoginLayout: React.FC<LoginLayoutProps> = ({
  title,
  subtitle,
  children,
  className = "min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8",
}) => {
  return (
    <div className={className}>
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-2 text-sm text-gray-600">{subtitle}</p>
          )}
        </div>

        <Card>
          <CardHeader>
            <div className="text-center">
              <h3 className="text-lg font-medium text-gray-900">
                {title}
              </h3>
            </div>
          </CardHeader>
          <CardContent>
            {children}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
