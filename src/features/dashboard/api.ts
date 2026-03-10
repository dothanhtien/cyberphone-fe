import { apiClient } from "@/lib/axios/client";
import { DashboardRevenue, DashboardSummary } from "./types";

export const dashboardApi = {
  getSummary: (): Promise<DashboardSummary> => {
    return apiClient.get("/dashboard/summary");
  },

  getRevenue: (): Promise<DashboardRevenue[]> => {
    return apiClient.get("/dashboard/revenue");
  },
};
