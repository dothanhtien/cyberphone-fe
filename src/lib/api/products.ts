import apiClient from "./client";
import {
  CreateProductRequest,
  Paginated,
  Product,
  UpdateProductRequest,
} from "@/interfaces";

export const createProduct = (data: CreateProductRequest) => {
  return apiClient.post("/products", data);
};

export const getProducts = (
  {
    page,
    limit,
  }: {
    page: number;
    limit: number;
  } = { page: 1, limit: 10 }
) => {
  return apiClient.get<Paginated<Product>>("/products", {
    params: {
      page,
      limit,
    },
  });
};

export const getProduct = (id: string) => {
  return apiClient.get<Product>(`/products/${id}`);
};

export const updateProduct = (id: string, data: UpdateProductRequest) => {
  return apiClient.patch(`/products/${id}`, data);
};
