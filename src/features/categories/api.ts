import { apiClient } from "@/lib/axios/client";
import { PaginatedResponse, PaginationParams } from "@/types";
import { Category, CreateCategoryRequest } from "./types";

export const categoriesApi = {
  findAll: async (
    params?: PaginationParams,
  ): Promise<PaginatedResponse<Category>> => {
    return apiClient.get("/categories", { params });
  },

  create: async (data: CreateCategoryRequest): Promise<Category> => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("slug", data.slug);

    if (data.description) {
      formData.append("description", data.description);
    }

    if (data.parentId) {
      formData.append("parentId", data.parentId);
    }

    if (data.logo) {
      formData.append("logo", data.logo);
    }

    return apiClient.post<Category>("/categories", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
