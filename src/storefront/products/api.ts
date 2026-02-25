import { apiClient } from "@/lib/axios/client";
import {
  PaginatedResponse,
  StorefrontPaginationParams,
} from "@/types/paginations";
import { StorefrontProduct } from "./types";

export const storefrontProductsApi = {
  findAll: async (
    params: StorefrontPaginationParams = {},
  ): Promise<PaginatedResponse<StorefrontProduct>> => {
    return apiClient.get("/products", { params });
  },
};
