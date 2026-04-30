import { QueryClient } from "@tanstack/react-query";

import { storefrontProductsApi } from "./api";
import { fetchStorefrontProducts } from "./graphql";
import { queryKeys } from "@/lib/react-query/queryKeys";

export async function prefetchStorefrontProducts(queryClient: QueryClient) {
  return queryClient.prefetchQuery({
    queryKey: queryKeys.storefront.products.home(),
    queryFn: () => fetchStorefrontProducts(),
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
