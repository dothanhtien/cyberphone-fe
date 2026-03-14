import { apiClient } from "@/lib/axios/client";
import { Brand, CreateBrandRequest, UpdateBrandRequest } from "./types";
import { PaginatedResponse, PaginationParams } from "@/types";

export const brandsApi = {
  findAll: async (
    params?: PaginationParams,
  ): Promise<PaginatedResponse<Brand>> => {
    return apiClient.get("/admin/brands", { params });
  },

  findOne: async (id: string): Promise<Brand> => {
    return apiClient.get(`/admin/brands/${id}`);
  },

  create: async (data: CreateBrandRequest): Promise<Brand> => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("slug", data.slug);

    if (data.description) {
      formData.append("description", data.description);
    }

    if (data.logo) {
      formData.append("logo", data.logo);
    }

    return apiClient.post<Brand>("/admin/brands", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  update: async (id: string, data: UpdateBrandRequest): Promise<Brand> => {
    const formData = new FormData();

    if (data.name !== undefined) {
      formData.append("name", data.name);
    }

    if (data.slug !== undefined) {
      formData.append("slug", data.slug);
    }

    if ("description" in data) {
      formData.append("description", data.description ?? "");
    }

    if (data.logo) {
      formData.append("logo", data.logo);
    }

    if (data.removeLogo) {
      formData.append("removeLogo", "true");
    }

    return apiClient.patch<Brand>(`/admin/brands/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  delete: async (id: string): Promise<boolean> => {
    return apiClient.delete(`/admin/brands/${id}`);
  },
};
