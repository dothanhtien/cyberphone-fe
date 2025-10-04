export interface ProductVariant {
  id: string;
  productId: string;
  sku: string;
  name: string;
  slug: string;
  basePrice: number;
  salePrice: number;
  costPrice: number;
  weightKg: number;
  stockQuantity: number;
  lowStockThreshold: number;
  isActive: boolean;
  createdAt: string;
  createdBy: string | null;
  updatedAt: string | null;
  updatedBy: string | null;
}

export interface CreateProductVariantRequest {
  productId: string;
  sku: string;
  name: string;
  slug: string;
  basePrice: number;
  salePrice?: number;
  costPrice: number;
  weightKg?: number;
  stockQuantity?: number;
  lowStockThreshold?: number;
}

export type UpdateProductVariantRequest = Partial<CreateProductVariantRequest>;
