import apiClient from "./client";
import { Paginated, User } from "@/interfaces";

export const getUsers = (
  {
    page,
    limit,
  }: {
    page: number;
    limit: number;
  } = { page: 1, limit: 10 }
) => {
  return apiClient.get<Paginated<User>>(`/users?page=${page}&limit=${limit}`);
};
