import { Category, Paginated } from "@/interfaces";
import apiClient from "./client";

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
