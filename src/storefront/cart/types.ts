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
