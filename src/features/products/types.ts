import { ProductImageType, ProductStatus } from "./enums";
import { Brand } from "../brands/types";
import { Category } from "../categories/types";

export interface ProductImage {
  id: string;
  imageType: ProductImageType;
  altText: string | null;
  url: string;
}

export interface ProductAttribute {
  id: string;
  productId: string;
  attributeKey: string;
  attributeKeyDisplay: string;
  displayOrder: number;
  isActive: boolean;
  createdAt: string;
  createdBy: string;
  updatedAt: string | null;
  updatedBy: string | null;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  shortDescription: string | null;
  longDescription: string | null;
  status: ProductStatus;
  isFeatured: boolean;
  isBestseller: boolean;
  brand: Partial<Brand>;
  categories: Partial<Category>[];
  images: ProductImage[];
  isActive: boolean;
  createdAt: string;
  createdBy: string;
  updatedAt: string | null;
  updatedBy: string | null;
}

export interface CreateProductRequest {
  name: string;
  slug: string;
  shortDescription?: string | null;
  longDescription?: string | null;
  status: string;
  isFeatured?: boolean | null;
  isBestseller?: boolean | null;
  brandId: string;
  categoryIds: string[];
  images?: File[];
  imageMetas?: {
    imageType: ProductImageType;
    altText?: string | null;
    title?: string | null;
  }[];
  attributes?: {
    attributeKey: string;
    attributeKeyDisplay: string;
    displayOrder: number;
  }[];
}
