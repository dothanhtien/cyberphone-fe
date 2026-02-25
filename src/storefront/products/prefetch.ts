import { QueryClient } from "@tanstack/react-query";

import { StorefrontPaginationParams } from "@/types";
import { queryKeys } from "@/lib/react-query/queryKeys";
import { storefrontProductsApi } from "./api";

export async function prefetchStorefrontProducts(
  queryClient: QueryClient,
  params: StorefrontPaginationParams = {},
) {
  return queryClient.prefetchQuery({
    queryKey: queryKeys.storefront.products.list(params),
    queryFn: () => storefrontProductsApi.findAll(params),
    staleTime: 1000 * 60,
  });
}
