import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { ProductList } from "@/storefront/products/components/ProductList";
import { prefetchStorefrontProducts } from "@/storefront/products/prefetch";
import { Slider } from "@/storefront/home/components/Slider";
import { HeroSection } from "@/storefront/home/components/HeroSection";

export default async function Home() {
  const queryClient = new QueryClient();

  await prefetchStorefrontProducts(queryClient);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HeroSection slider={<Slider />} />

      <div className="mt-6">
        <ProductList />
      </div>
    </HydrationBoundary>
  );
}
