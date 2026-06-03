import { QueryClient } from "@tanstack/react-query";

import { storefrontProductsApi } from "./api";
import { fetchStorefrontProducts } from "./graphql";
import { configurationsApi } from "@/features/configurations/api";
import { queryKeys } from "@/lib/react-query/queryKeys";

export async function prefetchStorefrontProducts(queryClient: QueryClient) {
  let categorySlugs: string[] = [];

  try {
    const configurations = await queryClient.fetchQuery({
      queryKey: queryKeys.configurations.allItems(),
      queryFn: () => configurationsApi.findAllStorefrontConfigurations(),
      staleTime: 1000 * 60,
    });

    categorySlugs = configurations["product-sections"]
      .filter((s) => s.enabled && s.categorySlug)
      .sort((a, b) => a.displayOrder - b.displayOrder)
      .map((s) => s.categorySlug!);
  } catch (err) {
    console.error("Failed to prefetch storefront configurations:", err);
  }

  return queryClient.prefetchQuery({
    queryKey: queryKeys.storefront.products.home(categorySlugs),
    queryFn: () => fetchStorefrontProducts(categorySlugs),
    staleTime: 1000 * 60,
  });
}

export async function prefetchStorefrontProductDetails(
  queryClient: QueryClient,
  slug: string,
) {
  return queryClient.prefetchQuery({
    queryKey: queryKeys.storefront.products.details(slug),
    queryFn: () => storefrontProductsApi.findOne(slug),
    staleTime: 1000 * 60,
  });
}
