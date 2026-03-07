import { apiClient } from "@/lib/axios/client";
import { PaymentProvider } from "@/enums";
import { CreatePaymentRequest, StorefrontPayment } from "./types";

export const storefrontPaymentApi = {
  create: async (data: CreatePaymentRequest): Promise<{ payUrl: string }> => {
    return apiClient.post("/payment", data);
  },

  getPaymentReturn: async (
    provider: PaymentProvider,
    params: URLSearchParams,
  ) => {
    return apiClient.get<StorefrontPayment>(
      `payment/${provider}/return?${params}`,
    );
  },
};
