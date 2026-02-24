import { apiClient } from "@/lib/axios/client";
import {
  CreateProductVariantRequest,
  ProductVariant,
  UpdateProductVariantRequest,
} from "./types";

export const productVariantsApi = {
  getVariantsByProductId: async (
    productId: string,
  ): Promise<ProductVariant[]> => {
    return apiClient.get(`/products/${productId}/variants`);
  },

  create: async (
    productId: string,
    data: CreateProductVariantRequest,
  ): Promise<ProductVariant> => {
    return apiClient.post(`/products/${productId}/variants`, data);
  },

  update: async (
    variantId: string,
    data: UpdateProductVariantRequest,
  ): Promise<ProductVariant> => {
    return apiClient.patch(`/product-variants/${variantId}`, data);
  },
};
