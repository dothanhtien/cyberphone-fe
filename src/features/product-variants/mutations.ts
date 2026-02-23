import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/lib/react-query/queryKeys";
import { CreateProductVariantRequest } from "./types";
import { productVariantsApi } from "./api";

export const useCreateProductVariant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProductVariantRequest) =>
      productVariantsApi.create(data),
    onSuccess: (_, variable) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.productVariants.list(variable.productId),
      });
    },
  });
};
