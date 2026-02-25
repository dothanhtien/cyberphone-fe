import { apiClient } from "@/lib/axios/client";
import { PaginatedResponse, PaginationParams } from "@/types";
import { CreateProductRequest, Product } from "./types";

export const productsApi = {
  findAll: async (
    params?: PaginationParams,
  ): Promise<PaginatedResponse<Product>> => {
    return apiClient.get("/admin/products", { params });
  },

  create: async (data: CreateProductRequest): Promise<Product> => {
    const formData = new FormData();

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

    return apiClient.post("/admin/products", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
