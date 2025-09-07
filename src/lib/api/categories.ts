import apiClient from "./client";
import { Category, CreateCategoryData, Paginated } from "@/interfaces";

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

export const createCategory = (data: CreateCategoryData) => {
  return apiClient.post("/categories", data);
};
