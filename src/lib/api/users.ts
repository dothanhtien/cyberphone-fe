import apiClient from "./client";

export const getUsers = (
  {
    page,
    limit,
  }: {
    page: number;
    limit: number;
  } = { page: 1, limit: 10 }
) => {
  return apiClient.get(`/users?page=${page}&limit=${limit}`);
};
