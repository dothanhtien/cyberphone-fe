import { PaginationParams, StorefrontPaginationParams } from "@/types";
import { ResolveCartRequest } from "@/storefront/cart/types";
import { PaymentProvider } from "@/enums";
import { FilterParams } from "@/features/dashboard/types";
import { GetMediaItemsParams } from "@/features/media/types";

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
    details: (id: string) => [...queryKeys.brands.all, "details", id] as const,
  },
  products: {
    all: ["products"] as const,
    list: (params?: PaginationParams) =>
      [...queryKeys.products.all, "list", params] as const,
    details: (id: string) =>
      [...queryKeys.products.all, "details", id] as const,
    attributes: {
      all: () => [...queryKeys.products.all, "attributes"] as const,
      list: (productId: string) =>
        [...queryKeys.products.attributes.all(), productId] as const,
    },
  },
  productVariants: {
    all: ["productVariants"] as const,
    lists: () => [...queryKeys.productVariants.all, "list"] as const,
    list: (productId: string) =>
      [...queryKeys.productVariants.lists(), productId] as const,
  },
  dashboard: {
    all: ["dashboard"] as const,
    summary: (filter?: FilterParams) =>
      [...queryKeys.dashboard.all, "summary", filter] as const,
    revenue: (filter?: FilterParams) =>
      [...queryKeys.dashboard.all, "revenue", filter] as const,
    topSalesCategory: (filter?: FilterParams) =>
      [...queryKeys.dashboard.all, "topSalesCategory", filter] as const,
    topProducts: (filter?: FilterParams) =>
      [...queryKeys.dashboard.all, "topProducts", filter] as const,
    recentOrders: () => [...queryKeys.dashboard.all, "recentOrders"] as const,
  },
  media: {
    all: ["media"] as const,
    getMediaItems: (params: GetMediaItemsParams) =>
      [...queryKeys.media.all, "getMediaItems", params] as const,
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
    cart: {
      all: () => [...queryKeys.storefront.all, "cart"] as const,
      details: (params: ResolveCartRequest = {}) =>
        [...queryKeys.storefront.cart.all(), "detail", params] as const,
    },
    payment: {
      all: () => [...queryKeys.storefront.all, "payment"] as const,
      return: (provider: PaymentProvider, params: string) =>
        [
          ...queryKeys.storefront.payment.all(),
          "return",
          provider,
          params,
        ] as const,
    },
  },
};
