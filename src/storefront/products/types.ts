export interface StorefrontProduct {
  id: string;
  name: string;
  slug: string;
  shortDescription: string | null;
  price: number;
  salePrice: number | null;
  inStock: boolean;
  mainImage: string | null;
}
