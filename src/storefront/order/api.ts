import { apiClient } from "@/lib/axios/client";
import { CreateOrderRequest } from "./types";

export const storefrontOrderApi = {
  create: async (data: CreateOrderRequest): Promise<{ id: string }> => {
    return apiClient.post("/orders", data);
  },
};
