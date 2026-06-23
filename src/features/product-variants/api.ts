import { apiClient } from "@/lib/axios/client";
import {
  CreateProductVariantRequest,
  ProductVariant,
  ProductVariantListItem,
  UpdateProductVariantRequest,
} from "./types";

function buildVariantFormData(
  data: Partial<CreateProductVariantRequest>,
): FormData {
  const formData = new FormData();
  const { images, imageMetas, ...rest } = data;

  Object.entries(rest).forEach(([key, value]) => {
    if (value === undefined) return;
    formData.append(
      key,
      value === null
        ? ""
        : typeof value === "object"
          ? JSON.stringify(value)
          : String(value),
    );
  });

  images?.forEach((file) => formData.append("images", file));

  if (imageMetas?.length) {
    formData.append("imageMetas", JSON.stringify(imageMetas));
  }

  return formData;
}

export const productVariantsApi = {
  create: async (
    productId: string,
    data: CreateProductVariantRequest,
  ): Promise<ProductVariant> => {
    return apiClient.post(
      `/admin/products/${productId}/variants`,
      buildVariantFormData(data),
      { headers: { "Content-Type": "multipart/form-data" } },
    );
  },

  findAllByProductId: async (
    productId: string,
  ): Promise<ProductVariantListItem[]> => {
    return apiClient.get(`/admin/products/${productId}/variants`);
  },

  findOne: async (variantId: string): Promise<ProductVariant> => {
    return apiClient.get(`/admin/product-variants/${variantId}`);
  },

  update: async (
    variantId: string,
    data: UpdateProductVariantRequest,
  ): Promise<ProductVariant> => {
    return apiClient.patch(
      `/admin/product-variants/${variantId}`,
      buildVariantFormData(data),
      { headers: { "Content-Type": "multipart/form-data" } },
    );
  },

  delete: async (variantId: string): Promise<void> => {
    return apiClient.delete(`/admin/product-variants/${variantId}`);
  },
};
