import { apiClient } from "@/lib/axios/client";
import { CreateProductVariantRequest, ProductVariant } from "./types";

export const productVariantsApi = {
  getVariantsByProductId: async (
    productId: string,
  ): Promise<ProductVariant[]> => {
    return apiClient.get(`/products/${productId}/variants`);
  },

  create: async (
    data: CreateProductVariantRequest,
  ): Promise<ProductVariant> => {
    return apiClient.post("/product-variants", data);
  },
};
