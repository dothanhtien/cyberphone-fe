import { toFormData } from "@/app/utils";
import apiClient from "./client";
import {
  Category,
  CreateCategoryData,
  Paginated,
  UpdateCategoryData,
} from "@/interfaces";

export const createCategory = (data: CreateCategoryData) => {
  const formData = toFormData(data);
  return apiClient.post("/categories", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export const getCategories = (
  {
    page,
    limit,
  }: {
    page: number;
    limit: number;
  } = { page: 1, limit: 10 }
) => {
  return apiClient.get<Paginated<Category>>("/categories", {
    params: {
      page,
      limit,
    },
  });
};

export const getCategory = (id: string) => {
  return apiClient.get<Category>(`/categories/${id}`);
};

export const updateCategory = (id: string, data: UpdateCategoryData) => {
  const formData = toFormData(data);
  return apiClient.patch(`/categories/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
