import { gql } from "graphql-request";

import { StorefrontHomeData } from "./types";
import { gqlRequest } from "@/lib/graphql/client";

const PRODUCT_FIELDS = `
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
`;

export const slugToKey = (slug: string) => {
  const key = slug.replace(/-/g, "_");
  return /^[0-9]/.test(key) ? `_${key}` : key;
};

function buildHomeProductsQuery(categorySlugs: string[]) {
  const categoryFields = categorySlugs
    .map(
      (slug) =>
        `${slugToKey(slug)}: categoryProducts(category: "${slug}", limit: $limit) {
          ${PRODUCT_FIELDS}
        }`,
    )
    .join("\n");

  return gql`
    query StorefrontHome($limit: Int = 10) {
      newProducts(limit: $limit) {
        ${PRODUCT_FIELDS}
      }
      featuredProducts(limit: $limit) {
        ${PRODUCT_FIELDS}
      }
      ${categoryFields}
    }
  `;
}

export async function fetchStorefrontProducts(
  categorySlugs: string[],
  limit = 10,
): Promise<StorefrontHomeData> {
  return gqlRequest<StorefrontHomeData>(buildHomeProductsQuery(categorySlugs), {
    limit,
  });
}
