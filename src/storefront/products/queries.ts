import { useQuery } from "@tanstack/react-query";

import { StorefrontPaginationParams } from "@/types";
import { queryKeys } from "@/lib/react-query/queryKeys";
import { storefrontProductsApi } from "./api";

export const useStorefrontProducts = (
  params: StorefrontPaginationParams = {},
) => {
  return useQuery({
    queryKey: queryKeys.storefront.products.list(params),
    queryFn: () => storefrontProductsApi.findAll(params),
    staleTime: 1000 * 60,
  });
};
