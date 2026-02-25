import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { ProductList } from "@/storefront/products/components/ProductList";
import { prefetchStorefrontProducts } from "@/storefront/products/prefetch";

export default async function Home() {
  const queryClient = new QueryClient();

  await prefetchStorefrontProducts(queryClient, {});

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="py-6">
        <ProductList />
      </div>
    </HydrationBoundary>
  );
}
