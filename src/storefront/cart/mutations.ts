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

interface UpdateCartItemQuantityVariables {
  cartId: string;
  itemId: string;
}

export function useIncreaseCartItemQuantity() {
  return useMutation({
    mutationFn: ({ cartId, itemId }: UpdateCartItemQuantityVariables) =>
      storefrontCartApi.increaseCartItemQuantity(cartId, itemId),
  });
}

export function useDecreaseCartItemQuantity() {
  return useMutation({
    mutationFn: ({ cartId, itemId }: UpdateCartItemQuantityVariables) =>
      storefrontCartApi.decreaseCartItemQuantity(cartId, itemId),
  });
}

interface RemoveCartItemVariables {
  cartId: string;
  itemId: string;
}

export function useRemoveCartItem() {
  return useMutation({
    mutationFn: ({ cartId, itemId }: RemoveCartItemVariables) =>
      storefrontCartApi.removeCartItem(cartId, itemId),
  });
}
