export interface StorefrontProduct {
  id: string;
  name: string;
  slug: string;
  shortDescription: string | null;
  minPrice: number;
  minSalePrice: number | null;
  inStock: boolean;
  mainImage: string | null;
}
