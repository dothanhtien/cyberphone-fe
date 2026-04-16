import { Order, OrderDetails } from "./types";
import { apiClient } from "@/lib/axios/client";
import { PaginatedResponse, PaginationParams } from "@/types";

export const ordersApi = {
  findAll: async (
    params?: PaginationParams,
  ): Promise<PaginatedResponse<Order>> => {
    return apiClient.get("/admin/orders", { params });
  },

  findOne: async (id: string): Promise<OrderDetails> => {
    return apiClient.get(`/admin/orders/${id}`);
  },
};
