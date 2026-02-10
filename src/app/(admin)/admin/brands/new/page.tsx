"use client";

import { Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PageHeading } from "@/components/PageHeading";

export default function NewCategoryPage() {
  return (
    <div className="max-w-230">
      <div className="flex justify-between items-start mb-4">
        <div>
          <PageHeading className="mb-3">New brand</PageHeading>
          <p className="text-muted-foreground text-sm mb-3">
            Establish a new brand identity in your catalog
          </p>
        </div>

        <Button size="lg" type="submit" form="brand-form">
          <Save />
          Save change
        </Button>
      </div>
    </div>
  );
}
