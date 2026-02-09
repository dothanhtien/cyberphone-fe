import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/lib/react-query/queryKeys";
import { CreateCategoryRequest } from "@/types";
import { categoriesApi } from "./api";

export const useCreateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCategoryRequest) => categoriesApi.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.categories.all });
    },
  });
};
