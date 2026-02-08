import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/react-query/queryKeys";
import { PaginationParams } from "@/types";
import { categoriesApi } from "./api";

export const useCategories = (params?: PaginationParams) => {
  return useQuery({
    queryKey: queryKeys.categories.list(params),
    queryFn: () => categoriesApi.getAll(params),
  });
};
