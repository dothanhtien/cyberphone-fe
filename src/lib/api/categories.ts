import { toFormData } from "axios";
import apiClient from "./client";
import {
  Category,
  CreateCategoryRequest,
  Paginated,
  UpdateCategoryRequest,
} from "@/interfaces";

export const createCategory = (data: CreateCategoryRequest) => {
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
  return apiClient.get<Paginated<Category>>(
    `/categories?page=${page}&limit=${limit}`
  );
};

export const getCategory = (id: string) => {
  return apiClient.get<Category>(`/categories/${id}`);
};

export const updateCategory = (id: string, data: UpdateCategoryRequest) => {
  const formData = toFormData(data);
  return apiClient.patch(`/categories/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};
