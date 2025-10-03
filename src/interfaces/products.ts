import { Category } from "./categories";
import { Brand } from "./brands";

export interface Product {
  id: string;
  name: string;
  slug: string;
  shortDescription: string | null;
  description: string | null;
  isFeatured: boolean;
  metaTitle: string | null;
  metaDescription: string | null;
  brandId: string;
  brand?: Brand;
  categoryId: string;
  category?: Category;
  isActive: boolean;
  createdAt: string;
  createdBy: string;
  updatedAt: string | null;
  updatedBy: string | null;
}

export interface CreateProductRequest {
  name: string;
  slug: string;
  shortDescription?: string;
  description?: string;
  brandId: string;
  categoryId: string;
  isFeatured?: boolean;
  metaTitle?: string;
  metaDescription?: string;
}

export type UpdateProductRequest = Partial<CreateProductRequest>;
