import { gql } from "graphql-request";

import { HOME_CATEGORY_SECTIONS } from "@/config/storefront";
import { gqlRequest } from "@/lib/graphql/client";
import { StorefrontHomeData } from "./types";

const categoryFields = HOME_CATEGORY_SECTIONS.map(
  ({ slug }) =>
    `${slug.replace(/-/g, "_")}: categoryProducts(categorySlug: "${slug}", limit: $limit) {
      id 
      name 
      slug 
      shortDescription 
      isFeatured 
      isBestseller 
      price 
      salePrice  
      inStock 
      mainImage
      variantId
    }`,
).join("\n");

const GET_HOME_PRODUCTS = gql`
  query StorefrontHome($limit: Int = 10) {
    newProducts(limit: $limit) {
      id 
      name 
      slug 
      shortDescription 
      isFeatured 
      isBestseller 
      price 
      salePrice  
      inStock 
      mainImage
      variantId
    }
    featuredProducts(limit: $limit) {
      id 
      name 
      slug 
      shortDescription 
      isFeatured 
      isBestseller 
      price 
      salePrice  
      inStock 
      mainImage
      variantId
    }
    ${categoryFields}
  }
`;

export async function fetchStorefrontProducts(limit = 10): Promise<StorefrontHomeData> {
  return gqlRequest<StorefrontHomeData>(GET_HOME_PRODUCTS, { limit });
}
