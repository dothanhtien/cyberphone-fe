import { ProductVariantStockStatus } from "@/features/product-variants/enums";

export interface CartItem {
  id: string;
  variantId: string;
  variantName: string;
  quantity: number;
  price: number;
  salePrice: number | null;
  stockStatus: ProductVariantStockStatus;
  imageUrl: string | null;
}

export interface CartItemResponse {
  cartId: string;
  createdAt: string;
  createdBy: string;
  id: string;
  isActive: boolean;
  quantity: number;
  updatedAt: string | null;
  updatedBy: string | null;
  variantId: string;
}

export interface Cart {
  id: string;
  userId: string | null;
  sessionId: string;
  expiresAt: string;
  items: CartItem[];
}

export interface ResolveCartRequest {
  userId?: string | null;
  sessionId?: string | null;
}

export interface AddToCartRequest {
  variantId: string;
  quantity: number;
}
