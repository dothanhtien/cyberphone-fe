import {
  Category,
  CreateCategoryRequest,
  UpdateCategoryRequest,
} from "./types";
import { apiClient } from "@/lib/axios/client";
import { PaginatedResponse, PaginationParams } from "@/types";

export const categoriesApi = {
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

    return apiClient.post<Category>("/admin/categories", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  findAll: async (
    params?: PaginationParams,
  ): Promise<PaginatedResponse<Category>> => {
    return apiClient.get("/admin/categories", { params });
  },

  findOne: async (id: string): Promise<Category> => {
    return apiClient.get(`/admin/categories/${id}`);
  },

  update: async (
    id: string,
    data: UpdateCategoryRequest,
  ): Promise<{ id: string }> => {
    const formData = new FormData();

    if (data.name !== undefined) {
      formData.append("name", data.name);
    }

    if (data.slug !== undefined) {
      formData.append("slug", data.slug);
    }

    if (data.description !== undefined) {
      formData.append("description", data.description ?? "");
    }

    if (data.logo) {
      formData.append("logo", data.logo);
    }

    if (data.removeLogo) {
      formData.append("removeLogo", "true");
    }

    return apiClient.patch(`/admin/categories/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  delete: async (id: string): Promise<boolean> => {
    return apiClient.delete(`/admin/categories/${id}`);
  },
};
