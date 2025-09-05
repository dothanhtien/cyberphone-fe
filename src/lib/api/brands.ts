import { CreateBrand } from "@/app/interfaces";
import apiClient from "./client";

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
  return apiClient.get(`/brands?page=${page}&limit=${limit}`);
};

export const updateBrand = (id: string, data: CreateBrand) => {
  return apiClient.patch(`/brands/${id}`, data);
};

export const deleteBrand = (id: string) => {
  return apiClient.delete(`/brands/${id}`);
};
