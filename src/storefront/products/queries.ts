import { useQuery } from "@tanstack/react-query";

import { storefrontProductsApi } from "./api";
import { fetchStorefrontProducts } from "./graphql";
import { queryKeys } from "@/lib/react-query/queryKeys";

export const useStorefrontProducts = (categorySlugs: string[] | undefined) => {
  return useQuery({
    queryKey: queryKeys.storefront.products.home(categorySlugs),
    queryFn: () => fetchStorefrontProducts(categorySlugs!),
    staleTime: 1000 * 60,
    enabled: categorySlugs !== undefined,
  });
};

export const useStorefrontProductDetails = (slug: string) => {
  return useQuery({
    queryKey: queryKeys.storefront.products.details(slug),
    queryFn: () => storefrontProductsApi.findOne(slug),
    staleTime: 1000 * 60,
  });
};
