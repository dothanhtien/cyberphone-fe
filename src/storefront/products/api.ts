import { apiClient } from "@/lib/axios/client";
import {
  PaginatedResponse,
  StorefrontPaginationParams,
} from "@/types/paginations";
import { StorefrontProduct, StorefrontProductDetails } from "./types";

export const storefrontProductsApi = {
  findAll: async (
    params: StorefrontPaginationParams = {},
  ): Promise<PaginatedResponse<StorefrontProduct>> => {
    return apiClient.get("/products", { params });
  },

  findOne: async (slug: string): Promise<StorefrontProductDetails> => {
    return apiClient.get(`/products/${slug}`);
  },
};
