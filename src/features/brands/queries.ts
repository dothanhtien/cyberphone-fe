import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/react-query/queryKeys";
import { PaginationParams } from "@/types";
import { brandsApi } from "./api";

export const useBrands = (params?: PaginationParams) => {
  return useQuery({
    queryKey: queryKeys.brands.list(params),
    queryFn: () => brandsApi.findAll(params),
  });
};
