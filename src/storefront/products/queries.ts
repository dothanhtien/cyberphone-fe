import { useQuery } from "@tanstack/react-query";

import { storefrontProductsApi } from "./api";
import { fetchStorefrontProducts } from "./graphql";
import { StorefrontProductsParams } from "./types";
import { queryKeys } from "@/lib/react-query/queryKeys";

export const useStorefrontProducts = (categorySlugs: string[] | undefined) => {
  return useQuery({
    queryKey: queryKeys.storefront.products.home(categorySlugs),
    queryFn: () => fetchStorefrontProducts(categorySlugs!),
    staleTime: 1000 * 60,
    enabled: categorySlugs !== undefined,
  });
};

export const useStorefrontProductList = (
  params: StorefrontProductsParams,
  options?: { enabled?: boolean },
) => {
  return useQuery({
    queryKey: queryKeys.storefront.products.list(params),
    queryFn: () => storefrontProductsApi.findAll(params),
    staleTime: 1000 * 60,
    placeholderData: (prev) => prev,
    enabled: options?.enabled ?? true,
  });
};

export const useStorefrontProductDetails = (slug: string) => {
  return useQuery({
    queryKey: queryKeys.storefront.products.details(slug),
    queryFn: () => storefrontProductsApi.findOne(slug),
    staleTime: 1000 * 60,
  });
};
