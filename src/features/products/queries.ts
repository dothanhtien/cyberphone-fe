import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/react-query/queryKeys";
import { PaginationParams } from "@/types";
import { productsApi } from "./api";

export const useProducts = (params?: PaginationParams) => {
  return useQuery({
    queryKey: queryKeys.products.list(params),
    queryFn: () => productsApi.findAll(params),
  });
};

export const useProductAttributes = (productId: string) => {
  return useQuery({
    queryKey: queryKeys.products.attributes.list(productId),
    queryFn: () => productsApi.findAttributes(productId),
  });
};
