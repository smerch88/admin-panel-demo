"use client";

import { Button } from "@/components/ui/button";
import { LocaleSwitcher } from "@/components/common/LocaleSwitcher";
import { PageHeader } from "@/components/common/PageHeader";
import { Plus } from "lucide-react";

interface CollectionsHeaderProps {
  selectedLocale: string;
  onLocaleChange: (locale: string) => void;
  onCreate: () => void;
}

export const CollectionsHeader: React.FC<CollectionsHeaderProps> = ({
  selectedLocale,
  onLocaleChange,
  onCreate,
}) => {
  return (
    <PageHeader
      title="Collections"
      description="Manage your fundraising collections and campaigns"
    >
      <LocaleSwitcher
        selectedLocale={selectedLocale}
        onLocaleChange={onLocaleChange}
      />
      <Button onClick={onCreate} className="flex items-center space-x-2">
        <Plus className="h-4 w-4" />
        <span>Create Collection</span>
      </Button>
    </PageHeader>
  );
};
