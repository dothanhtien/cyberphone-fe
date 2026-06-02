import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { FeaturedCategories } from "@/storefront/home/components/FeaturedCategories";
import { HeroSection } from "@/storefront/home/components/HeroSection";
import { Slider } from "@/storefront/home/components/Slider";
import { ProductList } from "@/storefront/products/components/ProductList";
import { prefetchStorefrontProducts } from "@/storefront/products/prefetch";

export default async function Home() {
  const queryClient = new QueryClient();

  await prefetchStorefrontProducts(queryClient);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <HeroSection slider={<Slider />} />

      <FeaturedCategories />

      <div className="mt-10">
        <ProductList />
      </div>
    </HydrationBoundary>
  );
}
