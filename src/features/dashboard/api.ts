import { apiClient } from "@/lib/axios/client";
import {
  DashboardRevenue,
  SalesByCategory,
  DashboardSummary,
  TopProduct,
  RecentOrder,
  FilterParams,
} from "./types";

export const dashboardApi = {
  getSummary: (filterQuery: FilterParams = {}): Promise<DashboardSummary> => {
    const params: Record<string, string> = {};
    if (filterQuery.from) params.startDate = filterQuery.from;
    if (filterQuery.to) params.endDate = filterQuery.to;

    return apiClient.get("/dashboard/summary", { params });
  },

  getRevenue: (filterQuery: FilterParams = {}): Promise<DashboardRevenue[]> => {
    const params: Record<string, string> = {};
    if (filterQuery.from) params.startDate = filterQuery.from;
    if (filterQuery.to) params.endDate = filterQuery.to;

    return apiClient.get("/dashboard/revenue", { params });
  },

  getTopCategorySales: (
    filterQuery: FilterParams = {},
  ): Promise<SalesByCategory[]> => {
    const params: Record<string, string> = {};
    if (filterQuery.from) params.startDate = filterQuery.from;
    if (filterQuery.to) params.endDate = filterQuery.to;

    return apiClient.get("/dashboard/top-category-sales", { params });
  },

  getTopProducts: (filterQuery: FilterParams = {}): Promise<TopProduct[]> => {
    const params: Record<string, string> = {};
    if (filterQuery.from) params.startDate = filterQuery.from;
    if (filterQuery.to) params.endDate = filterQuery.to;

    return apiClient.get("/dashboard/top-products", { params });
  },

  getRecentOrders: (): Promise<RecentOrder[]> => {
    return apiClient.get("/dashboard/recent-orders");
  },
};
