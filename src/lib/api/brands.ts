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
  return apiClient.get(`/brands?page=${page}&limit=${limit}`);
};
