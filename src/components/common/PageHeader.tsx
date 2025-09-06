"use client";

import { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  description?: string;
  children?: ReactNode;
  className?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  description,
  children,
  className = "flex items-center justify-between mb-8",
}) => {
  return (
    <div className={className}>
      <div>
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        {description && <p className="text-gray-600 mt-2">{description}</p>}
      </div>
      {children && (
        <div className="flex items-center space-x-4">{children}</div>
      )}
    </div>
  );
};
