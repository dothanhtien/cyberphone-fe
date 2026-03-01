import { CartItem } from "@/storefront/cart/types";
import { apiClient } from "@/lib/axios/client";
import { AddToCartRequest, Cart, ResolveCartRequest } from "./types";

export const storefrontCartApi = {
  resolve: async (params: ResolveCartRequest): Promise<Cart> => {
    return await apiClient.post<Cart>("/carts/resolve", params);
  },

  addToCart: async (
    cartId: string,
    data: AddToCartRequest,
  ): Promise<CartItem> => {
    return apiClient.post(`/carts/${cartId}/items`, data);
  },
};
