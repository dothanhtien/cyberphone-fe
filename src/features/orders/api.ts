import { Order, OrderDetails } from "./types";
import { apiClient } from "@/lib/axios/client";
import { OrderStatus } from "@/enums";
import { PaginatedResponse, PaginationParams } from "@/types";

export const customerOrdersApi = {
  findAll: async (
    params?: PaginationParams,
  ): Promise<PaginatedResponse<Order>> => {
    return apiClient.get("/customer/orders", { params });
  },

  findOne: async (id: string): Promise<OrderDetails> => {
    return apiClient.get(`/customer/orders/${id}`);
  },
};

export const ordersApi = {
  findAll: async (
    params?: PaginationParams,
  ): Promise<PaginatedResponse<Order>> => {
    return apiClient.get("/admin/orders", { params });
  },

  findOne: async (id: string): Promise<OrderDetails> => {
    return apiClient.get(`/admin/orders/${id}`);
  },

  updateStatus: async (id: string, status: OrderStatus): Promise<void> => {
    return apiClient.patch(`/admin/orders/${id}/status`, { status });
  },
};
