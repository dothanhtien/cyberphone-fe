import { useQuery } from "@tanstack/react-query";

import { ordersApi } from "./api";
import { queryKeys } from "@/lib/react-query/queryKeys";
import { PaginationParams } from "@/types";

export const useOrders = (params?: PaginationParams) => {
  return useQuery({
    queryKey: queryKeys.orders.list(params),
    queryFn: () => ordersApi.findAll(params),
  });
};

export const useOrderDetails = (id: string) => {
  return useQuery({
    queryKey: queryKeys.orders.details(id),
    queryFn: () => ordersApi.findOne(id),
  });
};
