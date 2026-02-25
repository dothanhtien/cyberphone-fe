import { apiClient } from "@/lib/axios/client";
import { PaginatedResponse, PaginationParams } from "@/types/paginations";
import { StorefrontProduct } from "./types";

export const storefrontProductsApi = {
  findAll: async (
    params: PaginationParams = {},
  ): Promise<PaginatedResponse<StorefrontProduct>> => {
    return apiClient.get("/products", { params });
  },
};
