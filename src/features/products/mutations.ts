import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/lib/react-query/queryKeys";
import { productsApi } from "./api";
import { CreateProductRequest, UpdateProductRequest } from "./types";

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProductRequest) => productsApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products.all });
    },
  });
};

interface UpdateProductVariables {
  id: string;
  data: UpdateProductRequest;
}

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: UpdateProductVariables) =>
      productsApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.products.all,
      });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => productsApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.products.all });
    },
  });
};
