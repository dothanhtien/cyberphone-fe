import { apiClient } from "@/lib/api/client";
import { Category, PaginatedResponse, PaginationParams } from "@/types";

export const categoriesApi = {
  getAll: async (
    params?: PaginationParams,
  ): Promise<PaginatedResponse<Category>> => {
    return apiClient.get("/categories", {
      params,
    });
  },
};
