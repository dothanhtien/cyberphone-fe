import { Brand, Paginated } from "@/interfaces";
import apiClient from "./client";

export const getBrands = (
  {
    page,
    limit,
  }: {
    page: number;
    limit: number;
  } = { page: 1, limit: 10 }
) => {
  return apiClient.get<Paginated<Brand>>(`/brands?page=${page}&limit=${limit}`);
};
