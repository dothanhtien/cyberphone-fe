import { Suspense } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import {
  PAGE_SIZE,
  ProductsListPage,
} from "@/storefront/products/components/ProductsListPage";

function ProductsListFallback() {
  return (
    <div>
      <div className="mb-6">
        <Skeleton className="h-8 w-32 rounded" />
        <Skeleton className="h-4 w-24 rounded mt-2" />
      </div>

      <div className="flex gap-2 mb-6">
        <Skeleton className="h-9 flex-1 rounded" />
        <Skeleton className="h-9 w-44 rounded" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {Array.from({ length: PAGE_SIZE }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl border border-border overflow-hidden"
          >
            <Skeleton className="aspect-square w-full" />

            <div className="p-3 space-y-2">
              <Skeleton className="h-3 w-full rounded" />
              <Skeleton className="h-3 w-3/4 rounded" />
              <Skeleton className="h-5 w-1/2 rounded mt-2" />
              <Skeleton className="h-8 w-full rounded mt-2" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ProductsPage() {
  return (
    <Suspense fallback={<ProductsListFallback />}>
      <ProductsListPage />
    </Suspense>
  );
}
