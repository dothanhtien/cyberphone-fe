import { useMutation, UseMutationOptions } from "@tanstack/react-query";

import { AddToCartRequest, BuyNowRequest } from "./types";
import { storefrontCartApi } from "./api";
import { Cart } from "@/storefront/cart/types";
import { useCheckoutStore } from "@/stores/checkout";

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

export function useBuyNow(
  options?: Omit<UseMutationOptions<Cart, Error, BuyNowRequest>, "mutationFn">,
) {
  const setActiveCart = useCheckoutStore((state) => state.setActiveCart);
  return useMutation({
    ...options,
    mutationFn: (data: BuyNowRequest) => storefrontCartApi.buyNow(data),
    onSuccess: (cart, variables, onMutateResult, context) => {
      setActiveCart(cart);
      options?.onSuccess?.(cart, variables, onMutateResult, context);
    },
  });
}
