import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { ProductList } from "@/storefront/products/components/ProductList";
import { prefetchStorefrontProducts } from "@/storefront/products/prefetch";
import { Slider } from "@/storefront/home/components/Slider";

export default async function Home() {
  const queryClient = new QueryClient();

  await prefetchStorefrontProducts(queryClient, {});

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="mt-2">
        <Slider />
      </div>

      <div className="mt-6">
        <ProductList />
      </div>
    </HydrationBoundary>
  );
}
