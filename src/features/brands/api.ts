import { apiClient } from "@/lib/axios/client";
import { Brand } from "./types";
import { PaginatedResponse, PaginationParams } from "@/types";

export const brandsApi = {
  findAll: async (
    params?: PaginationParams,
  ): Promise<PaginatedResponse<Brand>> => {
    return apiClient.get("/brands", { params });
  },
};
