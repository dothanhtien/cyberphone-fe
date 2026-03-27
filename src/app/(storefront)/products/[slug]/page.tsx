import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

import { ProductDetails } from "@/storefront/products/components/product-details/ProductDetails";
import { prefetchStorefrontProductDetails } from "@/storefront/products/prefetch";

interface ProductDetailsPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProductDetailsPage({
  params,
}: ProductDetailsPageProps) {
  const { slug } = await params;
  const queryClient = new QueryClient();

  await prefetchStorefrontProductDetails(queryClient, slug);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductDetails slug={slug} />
    </HydrationBoundary>
  );
}
