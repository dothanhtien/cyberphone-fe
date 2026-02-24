import { ProductVariantStockStatus } from "./enums";

export interface ProductVariant {
  id: string;
  productId: string;
  sku: string;
  name: string;
  price: number;
  salePrice: number | null;
  costPrice: number | null;
  stockQuantity: number;
  stockStatus: ProductVariantStockStatus;
  lowStockThreshold: number;
  isDefault: boolean;
  isActive: boolean;
  createdAt: string;
  createdBy: string;
  updatedAt: string | null;
  updatedBy: string | null;
}

export interface CreateProductVariantRequest {
  name: string;
  sku: string;
  price: number;
  salePrice?: number | null;
  costPrice?: number | null;
  stockQuantity: number | null;
  lowStockThreshold: number | null;
  isDefault: boolean;
}

export type UpdateProductVariantRequest = Partial<CreateProductVariantRequest>;
