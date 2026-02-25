import { PaginationParams, StorefrontPaginationParams } from "@/types";

export const queryKeys = {
  auth: {
    all: ["auth"] as const,
    me: () => ["auth", "me"] as const,
  },
  categories: {
    all: ["categories"] as const,
    list: (params?: PaginationParams) =>
      [...queryKeys.categories.all, "list", params] as const,
  },
  brands: {
    all: ["brands"] as const,
    list: (params?: PaginationParams) =>
      [...queryKeys.brands.all, "list", params] as const,
  },
  products: {
    all: ["products"] as const,
    list: (params?: PaginationParams) =>
      [...queryKeys.products.all, "list", params] as const,
  },
  productVariants: {
    all: ["productVariants"] as const,
    lists: () => [...queryKeys.productVariants.all, "list"] as const,
    list: (productId: string) =>
      [...queryKeys.productVariants.lists(), productId] as const,
  },

  storefront: {
    all: ["storefront"] as const,
    products: {
      all: () => [...queryKeys.storefront.all, "products"] as const,
      list: (params: StorefrontPaginationParams = {}) => [
        ...queryKeys.storefront.products.all(),
        "list",
        params ?? {},
      ],
    },
  },
};
