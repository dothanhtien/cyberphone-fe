import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/lib/react-query/queryKeys";
import {
  CreateProductVariantRequest,
  UpdateProductVariantRequest,
} from "./types";
import { productVariantsApi } from "./api";

interface CreateProductVariantVariables {
  productId: string;
  data: CreateProductVariantRequest;
}

export const useCreateProductVariant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ productId, data }: CreateProductVariantVariables) =>
      productVariantsApi.create(productId, data),
    onSuccess: (_, variable) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.productVariants.list(variable.productId),
      });
    },
  });
};

interface UpdateProductVariantVariables {
  productId: string;
  variantId: string;
  data: UpdateProductVariantRequest;
}

export const useUpdateProductVariant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ variantId, data }: UpdateProductVariantVariables) =>
      productVariantsApi.update(variantId, data),
    onSuccess: (_, variable) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.productVariants.list(variable.productId),
      });
    },
  });
};
