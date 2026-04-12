"use client";

import { PageHeading } from "@/components/PageHeading";
import { usePageLayout } from "@/hooks";

export default function OrdersPage() {
  usePageLayout();

  return (
    <div className="flex justify-between items-center mb-6">
      <PageHeading>My orders</PageHeading>
    </div>
  );
}
