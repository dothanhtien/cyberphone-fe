import { apiClient } from "@/lib/axios/client";
import { StorefrontProductDetails } from "./types";

export const storefrontProductsApi = {
  findOne: async (slug: string): Promise<StorefrontProductDetails> => {
    return apiClient.get(`/products/${slug}`);
  },
};
