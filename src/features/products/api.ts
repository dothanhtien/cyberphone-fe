import { apiClient } from "@/lib/axios/client";
import { PaginatedResponse, PaginationParams } from "@/types";
import {
  CreateProductRequest,
  Product,
  ProductAttribute,
  UpdateProductRequest,
} from "./types";

export const productsApi = {
  findAll: async (
    params?: PaginationParams,
  ): Promise<PaginatedResponse<Product>> => {
    return apiClient.get("/admin/products", { params });
  },

  findOne: async (id: string): Promise<Product | null> => {
    return apiClient.get(`/admin/products/${id}`);
  },

  create: async (data: CreateProductRequest): Promise<Pick<Product, "id">> => {
    const formData = new FormData();

    if (data.id) {
      formData.append("id", data.id);
    }

    formData.append("name", data.name);
    formData.append("slug", data.slug);

    if (data.shortDescription) {
      formData.append("shortDescription", data.shortDescription);
    }

    if (data.longDescription) {
      formData.append("longDescription", data.longDescription);
    }

    if (data.brandId) {
      formData.append("brandId", data.brandId);
    }

    if (data.categoryIds) {
      formData.append("categoryIds", JSON.stringify(data.categoryIds));
    }

    if (data.status) {
      formData.append("status", data.status);
    }

    if (data.isFeatured !== undefined && data.isFeatured !== null) {
      formData.append("isFeatured", String(data.isFeatured));
    }

    if (data.isBestseller !== undefined && data.isBestseller !== null) {
      formData.append("isBestseller", String(data.isBestseller));
    }

    if (data.images?.length) {
      data.images.forEach((file) => {
        formData.append("images", file);
      });
    }

    if (data.imageMetas?.length) {
      formData.append("imageMetas", JSON.stringify(data.imageMetas));
    }

    if (data.attributes?.length) {
      formData.append("attributes", JSON.stringify(data.attributes));
    }

    return apiClient.post("/admin/products", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  update: async (id: string, data: UpdateProductRequest): Promise<boolean> => {
    const formData = new FormData();

    if (data.name !== undefined) {
      formData.append("name", data.name);
    }

    if (data.slug !== undefined) {
      formData.append("slug", data.slug);
    }

    if (data.shortDescription !== undefined) {
      formData.append("shortDescription", data.shortDescription);
    }

    if (data.longDescription !== undefined) {
      formData.append("longDescription", data.longDescription);
    }

    if (data.brandId) {
      formData.append("brandId", data.brandId);
    }

    if (Array.isArray(data.categoryIds)) {
      formData.append("categoryIds", JSON.stringify(data.categoryIds));
    }

    if (data.status !== undefined) {
      formData.append("status", data.status);
    }

    if (data.isFeatured !== undefined && data.isFeatured !== null) {
      formData.append("isFeatured", String(data.isFeatured));
    }

    if (data.isBestseller !== undefined && data.isBestseller !== null) {
      formData.append("isBestseller", String(data.isBestseller));
    }

    if (Array.isArray(data.attributes)) {
      formData.append("attributes", JSON.stringify(data.attributes));
    }

    return apiClient.patch(`/admin/products/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  findAttributes: async (productId: string): Promise<ProductAttribute[]> => {
    return apiClient.get(`/admin/products/${productId}/attributes`);
  },

  delete: async (id: string): Promise<boolean> => {
    return apiClient.delete(`/admin/products/${id}`);
  },
};
