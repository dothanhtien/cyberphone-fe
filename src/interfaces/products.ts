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
  categoryId: string;
  isActive: boolean;
  createdAt: string;
  createdBy: string;
  updatedAt: string | null;
  updatedBy: string | null;
}

export interface CreateProductData {
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

export type UpdateProductData = Partial<CreateProductData>;
