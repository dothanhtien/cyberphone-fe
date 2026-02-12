import { apiClient } from "@/lib/axios/client";
import { PaginatedResponse, PaginationParams } from "@/types";
import { Product } from "./types";

export const productsApi = {
  findAll: async (
    params?: PaginationParams,
  ): Promise<PaginatedResponse<Product>> => {
    return apiClient.get("/products", { params });
  },
};
