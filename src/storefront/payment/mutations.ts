import { useMutation } from "@tanstack/react-query";
import { CreatePaymentRequest } from "./types";
import { storefrontPaymentApi } from "./api";

export function useCreatePayment() {
  return useMutation({
    mutationFn: (data: CreatePaymentRequest) =>
      storefrontPaymentApi.create(data),
  });
}
