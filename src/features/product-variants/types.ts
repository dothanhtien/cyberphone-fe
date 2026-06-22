import { ProductVariantStockStatus } from "./enums";
import { ProductImageType } from "../products/enums";
import { ProductImage } from "../products/types";

export type { ProductImage };

export interface VariantAttribute {
  id: string;
  variantId: string;
  productAttributeId: string;
  attributeValue: string;
  attributeValueDisplay: string | null;
  isActive: true;
  createdAt: string;
  createdBy: string;
  updatedAt: string | null;
  updatedBy: string | null;
}

export interface ProductVariantListItem {
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
  mainImageUrl: string | null;
}

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
  attributes: VariantAttribute[];
  images: ProductImage[];
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
  images?: File[];
  imageMetas?: {
    id?: string;
    imageType: ProductImageType;
    altText?: string | null;
    title?: string | null;
    displayOrder?: number;
    isDeleted?: boolean;
  }[];
}

export type UpdateProductVariantRequest = Partial<CreateProductVariantRequest>;
