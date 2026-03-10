import { useQuery } from "@tanstack/react-query";

import { queryKeys } from "@/lib/react-query/queryKeys";
import { dashboardApi } from "./api";

export const useDashboardSummary = () => {
  return useQuery({
    queryKey: queryKeys.dashboard.summary(),
    queryFn: () => dashboardApi.getSummary(),
  });
};

export const useDashboardRevenue = () => {
  return useQuery({
    queryKey: queryKeys.dashboard.revuenue(),
    queryFn: () => dashboardApi.getRevenue(),
  });
};
