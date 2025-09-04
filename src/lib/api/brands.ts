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
