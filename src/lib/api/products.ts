import apiClient from "./client";
import {
  Category,
  CreateCategoryData,
  CreateProductData,
  Paginated,
  Product,
  UpdateCategoryData,
} from "@/interfaces";

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
