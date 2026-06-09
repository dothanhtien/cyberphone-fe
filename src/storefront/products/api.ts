import { apiClient } from "@/lib/axios/client";
import {
  StorefrontProductDetails,
  StorefrontProductList,
  StorefrontProductsParams,
} from "./types";

export const storefrontProductsApi = {
  findAll: async (
    params?: StorefrontProductsParams,
  ): Promise<StorefrontProductList> => {
    return apiClient.get("/products", { params });
  },

  findOne: async (slug: string): Promise<StorefrontProductDetails> => {
    return apiClient.get(`/products/${slug}`);
  },
};
