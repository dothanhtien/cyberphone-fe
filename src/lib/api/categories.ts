import apiClient from "./client";
import {
  Category,
  CreateCategoryData,
  Paginated,
  UpdateCategoryData,
} from "@/interfaces";

export const createCategory = (data: CreateCategoryData) => {
  return apiClient.post("/categories", data);
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

export const getCategoryDetails = (id: string) => {
  return apiClient.get<Category>(`/categories/${id}`);
};

export const updateCategory = (id: string, data: UpdateCategoryData) => {
  return apiClient.patch(`/categories/${id}`, data);
};
