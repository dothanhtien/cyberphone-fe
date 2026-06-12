import { useQuery } from "@tanstack/react-query";

import { ordersApi, customerOrdersApi } from "./api";
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

export const useCustomerOrders = (params?: PaginationParams) => {
  return useQuery({
    queryKey: queryKeys.customerOrders.list(params),
    queryFn: () => customerOrdersApi.findAll(params),
  });
};

export const useCustomerOrderDetails = (id: string) => {
  return useQuery({
    queryKey: queryKeys.customerOrders.details(id),
    queryFn: () => customerOrdersApi.findOne(id),
  });
};
