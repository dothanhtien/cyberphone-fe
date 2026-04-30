import { useQuery } from "@tanstack/react-query";

import { storefrontProductsApi } from "./api";
import { fetchStorefrontProducts } from "./graphql";
import { queryKeys } from "@/lib/react-query/queryKeys";

export const useStorefrontProducts = () => {
  return useQuery({
    queryKey: queryKeys.storefront.products.home(),
    queryFn: () => fetchStorefrontProducts(),
    staleTime: 1000 * 60,
  });
};

export const useStorefrontProductDetails = (slug: string) => {
  return useQuery({
    queryKey: queryKeys.storefront.products.details(slug),
    queryFn: () => storefrontProductsApi.findOne(slug),
    staleTime: 1000 * 60,
  });
};
