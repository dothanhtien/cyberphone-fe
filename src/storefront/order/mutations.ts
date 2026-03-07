import { useMutation } from "@tanstack/react-query";
import { CreateOrderRequest } from "./types";
import { storefrontOrderApi } from "./api";

export function useCreateOrder() {
  return useMutation({
    mutationFn: (data: CreateOrderRequest) => storefrontOrderApi.create(data),
  });
}
