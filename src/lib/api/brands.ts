import apiClient from "./client";
import { Brand, CreateBrandRequest, Paginated } from "@/interfaces";
import { toFormData } from "@/utils";

export const createBrand = (data: CreateBrandRequest) => {
  const formData = toFormData(data);
  return apiClient.post("/brands", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
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
