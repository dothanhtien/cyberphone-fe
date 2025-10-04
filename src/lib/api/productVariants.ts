import apiClient from "./client";
import {
  CreateProductVariantRequest,
  ProductVariant,
  UpdateProductVariantRequest,
} from "@/interfaces";

export const create = (data: CreateProductVariantRequest) => {
  return apiClient.post<ProductVariant>("/product-variants", data);
};

export const update = (id: string, data: UpdateProductVariantRequest) => {
  return apiClient.patch(`/product-variants/${id}`, data);
};

export const remove = (id: string) => {
  return apiClient.delete(`/product-variants/${id}`);
};
