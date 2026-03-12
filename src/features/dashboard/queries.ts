import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/react-query/queryKeys";
import { dashboardApi } from "./api";
import { FilterParams } from "./types";

export const useDashboardSummary = (filter?: FilterParams) => {
  return useQuery({
    queryKey: queryKeys.dashboard.summary(filter),
    queryFn: () => dashboardApi.getSummary(filter),
  });
};

export const useDashboardRevenue = (filter?: FilterParams) => {
  return useQuery({
    queryKey: queryKeys.dashboard.revuenue(filter),
    queryFn: () => dashboardApi.getRevenue(filter),
  });
};

export const useDashboardTopSalesCategory = (filter?: FilterParams) => {
  return useQuery({
    queryKey: queryKeys.dashboard.topSalesCategory(filter),
    queryFn: () => dashboardApi.getTopCategorySales(filter),
  });
};

export const useDashboardTopProducts = (filter?: FilterParams) => {
  return useQuery({
    queryKey: queryKeys.dashboard.topProducts(filter),
    queryFn: () => dashboardApi.getTopProducts(filter),
  });
};

export const useDashboardRecentOrders = () => {
  return useQuery({
    queryKey: queryKeys.dashboard.recentOrders(),
    queryFn: () => dashboardApi.getRecentOrders(),
  });
};
