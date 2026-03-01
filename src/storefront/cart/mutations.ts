import { useMutation } from "@tanstack/react-query";

import { AddToCartRequest } from "./types";
import { storefrontCartApi } from "./api";

interface AddToCartVariables {
  cartId: string;
  data: AddToCartRequest;
}

export function useAddToCart() {
  return useMutation({
    mutationFn: ({ cartId, data }: AddToCartVariables) =>
      storefrontCartApi.addToCart(cartId, data),
  });
}
