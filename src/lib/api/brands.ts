import apiClient from "./client";
import { Brand, CreateBrand, Paginated } from "@/interfaces";

export const createBrand = (data: CreateBrand) => {
  return apiClient.post("/brands", data);
};

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

export const updateBrand = (id: string, data: Partial<CreateBrand>) => {
  return apiClient.patch(`/brands/${id}`, data);
};

export const deleteBrand = (id: string) => {
  return apiClient.delete(`/brands/${id}`);
};
