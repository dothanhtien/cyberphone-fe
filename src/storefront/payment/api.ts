import { apiClient } from "@/lib/axios/client";
import { CreatePaymentRequest } from "./types";

export const storefrontPaymentApi = {
  create: async (data: CreatePaymentRequest): Promise<{ payUrl: string }> => {
    return apiClient.post("/payment", data);
  },
};
