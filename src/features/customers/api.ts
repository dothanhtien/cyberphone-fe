import { apiClient } from "@/lib/axios/client";
import { PaginatedResponse, PaginationParams } from "@/types";
import { Customer, UpdateCustomerRequest } from "./types";

export const customersApi = {
  findAll: async (
    params?: PaginationParams,
  ): Promise<PaginatedResponse<Customer>> => {
    return apiClient.get("/admin/customers", { params });
  },

  findOne: async (id: string): Promise<Customer> => {
    return apiClient.get(`/admin/customers/${id}`);
  },

  update: async (id: string, data: UpdateCustomerRequest): Promise<Customer> => {
    return apiClient.patch(`/admin/customers/${id}`, data);
  },

  delete: async (id: string): Promise<void> => {
    return apiClient.delete(`/admin/customers/${id}`);
  },
};
