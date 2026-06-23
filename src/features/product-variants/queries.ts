import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/react-query/queryKeys";
import { productVariantsApi } from "./api";

export const useProductVariants = (productId: string) => {
  return useQuery({
    queryKey: queryKeys.productVariants.list(productId),
    queryFn: () => productVariantsApi.findAllByProductId(productId),
  });
};

export const useProductVariantDetails = (variantId: string) => {
  return useQuery({
    queryKey: queryKeys.productVariants.details(variantId),
    queryFn: () => productVariantsApi.findOne(variantId),
    enabled: !!variantId,
  });
};
