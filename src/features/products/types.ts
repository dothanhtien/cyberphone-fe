import { ProductStatus } from "./enums";

export interface Product {
  id: string;
  name: string;
  slug: string;
  shortDescription: string | null;
  longDescription: string | null;
  status: ProductStatus;
  isFeatured: boolean;
  isBestseller: boolean;
  isActive: boolean;
  createdAt: string;
  createdBy: string;
  updatedAt: string | null;
  updatedBy: string | null;
}
