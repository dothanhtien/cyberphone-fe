import { apiClient } from "@/lib/axios/client";
import { Brand, CreateBrandRequest } from "./types";
import { PaginatedResponse, PaginationParams } from "@/types";

export const brandsApi = {
  findAll: async (
    params?: PaginationParams,
  ): Promise<PaginatedResponse<Brand>> => {
    return apiClient.get("/brands", { params });
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

    return apiClient.post<Brand>("/brands", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
