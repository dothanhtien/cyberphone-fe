import { CartItem, CartItemResponse } from "@/storefront/cart/types";
import { apiClient } from "@/lib/axios/client";
import { AddToCartRequest, BuyNowRequest, Cart, ResolveCartRequest } from "./types";

export const storefrontCartApi = {
  resolve: async (params: ResolveCartRequest): Promise<Cart> => {
    return apiClient.post<Cart>("/carts/resolve", params);
  },

  buyNow: async (data: BuyNowRequest): Promise<Cart> => {
    return apiClient.post<Cart>("/carts/buy-now", data);
  },

  addToCart: async (
    cartId: string,
    data: AddToCartRequest,
  ): Promise<CartItem> => {
    return apiClient.post(`/carts/${cartId}/items`, data);
  },

  increaseCartItemQuantity: async (
    cartId: string,
    itemId: string,
  ): Promise<CartItemResponse> => {
    return apiClient.patch(`/carts/${cartId}/items/${itemId}/increase`);
  },

  decreaseCartItemQuantity: async (
    cartId: string,
    itemId: string,
  ): Promise<CartItemResponse> => {
    return apiClient.patch(`/carts/${cartId}/items/${itemId}/decrease`);
  },

  removeCartItem: async (
    cartId: string,
    itemId: string,
  ): Promise<CartItemResponse> => {
    return apiClient.delete(`/carts/${cartId}/items/${itemId}`);
  },
};
