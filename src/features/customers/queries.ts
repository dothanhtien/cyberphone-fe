import { useQuery } from "@tanstack/react-query";

import { customersApi } from "./api";
import { queryKeys } from "@/lib/react-query/queryKeys";
import { PaginationParams } from "@/types";

export const useCustomers = (params?: PaginationParams) => {
  return useQuery({
    queryKey: queryKeys.customers.list(params),
    queryFn: () => customersApi.findAll(params),
  });
};

export const useCustomerDetails = (id: string) => {
  return useQuery({
    queryKey: queryKeys.customers.details(id),
    queryFn: () => customersApi.findOne(id),
    enabled: !!id,
  });
};
