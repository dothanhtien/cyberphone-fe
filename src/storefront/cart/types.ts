export interface CartItem {
  id: string;
  cartId: string;
  variantId: string;
  quantity: number;
  price: number;
  isActive: boolean;
  createdAt: string;
  createdBy: string;
  updatedAt: string | null;
  updatedBy: string | null;
}

export interface Cart {
  id: string;
  userId: string | null;
  sessionId: string;
  expiresAt: string;
  items: CartItem[];
  isActive: boolean;
  createdAt: string;
  createdBy: string;
  updatedAt: string | null;
  updatedBy: string | null;
}

export interface ResolveCartRequest {
  userId?: string | null;
  sessionId?: string | null;
}

export interface AddToCartRequest {
  variantId: string;
  quantity: number;
}
