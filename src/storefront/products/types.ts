export interface StorefrontProduct {
  id: string;
  name: string;
  slug: string;
  shortDescription: string | null;
  longDescription: string | null;
  price: number;
  salePrice: number | null;
  inStock: boolean;
  mainImage: string | null;
  variantId: string;
}

export interface StorefrontProductAttribute {
  id: string;
  attributeKey: string;
  attributeKeyDisplay: string;
  displayOrder: number;
}

export interface StorefrontVariantAttribute {
  id: string;
  productAttributeId: string;
  attributeValue: string;
  attributeValueDisplay: string;
}

export interface StorefrontVariant {
  id: string;
  name: string;
  price: number;
  salePrice: number | null;
  stockQuantity: number;
  isDefault: boolean;
  attributes: StorefrontVariantAttribute[];
}

export interface StorefrontProductImage {
  id: string;
  url: string;
}

export interface StorefrontProductDetails {
  id: string;
  name: string;
  slug: string;
  shortDescription: string | null;
  longDescription: string | null;
  price: number;
  salePrice: number | null;
  inStock: boolean;
  url: string | null;
  variants: StorefrontVariant[];
  attributes: StorefrontProductAttribute[];
  images: StorefrontProductImage[];
}
