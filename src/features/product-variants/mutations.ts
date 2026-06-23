import { useMutation, useQueryClient } from "@tanstack/react-query";

import { productVariantsApi } from "./api";
import {
  CreateProductVariantRequest,
  UpdateProductVariantRequest,
} from "./types";
import { queryKeys } from "@/lib/react-query/queryKeys";

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
      queryClient.invalidateQueries({
        queryKey: queryKeys.productVariants.details(variable.variantId),
      });
    },
  });
};

interface DeleteProductVariantVariables {
  productId: string;
  variantId: string;
}

export const useDeleteProductVariant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ variantId }: DeleteProductVariantVariables) =>
      productVariantsApi.delete(variantId),
    onSuccess: (_, { productId, variantId }) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.productVariants.list(productId),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.productVariants.details(variantId),
      });
    },
  });
};
