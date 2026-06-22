import { BreadcrumbItem } from "@/types";

function profileLayoutConfig(prefix: "/admin" | "/customers") {
  const href = `${prefix}/profile`;
  return () => ({
    title: "My Profile",
    activeMenuKey: href,
    breadcrumbs: [{ label: "Profile", href }],
  });
}

export const layoutConfigMap: Record<
  string,
  (params?: { segmentLabel?: string; pathname?: string }) => {
    title: string;
    activeMenuKey: string;
    breadcrumbs: BreadcrumbItem[];
  }
> = {
  "/admin/dashboard": () => ({
    title: "Dashboard",
    activeMenuKey: "/admin/dashboard",
    breadcrumbs: [
      {
        label: "Dashboard",
        href: "/admin/dashboard",
      },
    ],
  }),

  "/admin/brands": () => ({
    title: "Brands",
    activeMenuKey: "/admin/brands",
    breadcrumbs: [
      {
        label: "Brands",
        href: "/admin/brands",
      },
    ],
  }),
  "/admin/brands/new": () => ({
    title: "New brand",
    activeMenuKey: "/admin/brands",
    breadcrumbs: [
      {
        label: "Brands",
        href: "/admin/brands",
      },
      {
        label: "New",
      },
    ],
  }),
  "/admin/brands/[id]/edit": (params) => ({
    title: "Edit brand",
    activeMenuKey: "/admin/brands",
    breadcrumbs: [
      {
        label: "Brands",
        href: "/admin/brands",
      },
      {
        label: params?.segmentLabel || "Details",
      },
      {
        label: "Edit",
      },
    ],
  }),

  "/admin/categories": () => ({
    title: "Categories",
    activeMenuKey: "/admin/categories",
    breadcrumbs: [
      {
        label: "Categories",
        href: "/admin/categories",
      },
    ],
  }),
  "/admin/categories/new": () => ({
    title: "New category",
    activeMenuKey: "/admin/categories",
    breadcrumbs: [
      {
        label: "Categories",
        href: "/admin/categories",
      },
      {
        label: "New",
      },
    ],
  }),

  "/admin/products": () => ({
    title: "Products",
    activeMenuKey: "/admin/products",
    breadcrumbs: [
      {
        label: "Products",
        href: "/admin/products",
      },
    ],
  }),
  "/admin/products/new": () => ({
    title: "New product",
    activeMenuKey: "/admin/products",
    breadcrumbs: [
      {
        label: "Products",
        href: "/admin/products",
      },
      {
        label: "New",
      },
    ],
  }),
  "/admin/products/[id]/edit": (params) => ({
    title: "Edit product",
    activeMenuKey: "/admin/products",
    breadcrumbs: [
      { label: "Products", href: "/admin/products" },
      {
        label: params?.segmentLabel || "Details",
      },
      {
        label: "Edit",
      },
    ],
  }),
  "/admin/products/[id]/variants": (params) => ({
    title: "Product variants",
    activeMenuKey: "/admin/products",
    breadcrumbs: [
      { label: "Products", href: "/admin/products" },
      {
        label: params?.segmentLabel || "Details",
      },
      {
        label: "Variants",
      },
    ],
  }),
  "/admin/products/[id]/variants/new": (params) => ({
    title: "New variant",
    activeMenuKey: "/admin/products",
    breadcrumbs: [
      { label: "Products", href: "/admin/products" },
      {
        label: params?.segmentLabel || "Details",
      },
      {
        label: "Variants",
        href: params?.pathname?.replace("/new", "") || "/admin/products",
      },
      {
        label: "New",
      },
    ],
  }),
  "/admin/products/[id]/variants/[variantId]": (params) => ({
    title: "Variant details",
    activeMenuKey: "/admin/products",
    breadcrumbs: [
      { label: "Products", href: "/admin/products" },
      {
        label: params?.segmentLabel || "Details",
      },
      {
        label: "Variants",
      },
    ],
  }),
  "/admin/products/[id]/variants/[variantId]/edit": (params) => ({
    title: "Edit variant",
    activeMenuKey: "/admin/products",
    breadcrumbs: [
      { label: "Products", href: "/admin/products" },
      {
        label: params?.segmentLabel || "Details",
      },
      {
        label: "Variants",
      },
      {
        label: "Edit",
      },
    ],
  }),

  "/admin/orders": () => ({
    title: "Orders",
    activeMenuKey: "/admin/orders",
    breadcrumbs: [
      {
        label: "Orders",
        href: "/admin/orders",
      },
    ],
  }),
  "/admin/orders/[id]": (params) => ({
    title: "Order details",
    activeMenuKey: "/admin/orders",
    breadcrumbs: [
      { label: "Orders", href: "/admin/orders" },
      {
        label: params?.segmentLabel || "Details",
      },
    ],
  }),

  "/admin/customers": () => ({
    title: "Customers",
    activeMenuKey: "/admin/customers",
    breadcrumbs: [
      {
        label: "Customers",
        href: "/admin/customers",
      },
    ],
  }),
  "/admin/customers/[id]": (params) => ({
    title: "Customer details",
    activeMenuKey: "/admin/customers",
    breadcrumbs: [
      { label: "Customers", href: "/admin/customers" },
      {
        label: params?.segmentLabel || "Details",
      },
    ],
  }),

  "/admin/configurations/storefront": () => ({
    title: "Storefront Configurations",
    activeMenuKey: "/admin/configurations/storefront",
    breadcrumbs: [
      {
        label: "Storefront Configurations",
        href: "/admin/configurations/storefront",
      },
    ],
  }),

  "/admin/profile": profileLayoutConfig("/admin"),

  "/customers/orders": () => ({
    title: "My orders",
    activeMenuKey: "/customers/orders",
    breadcrumbs: [
      {
        label: "Orders",
        href: "/customers/orders",
      },
    ],
  }),
  "/customers/orders/[id]": (params) => ({
    title: "Order details",
    activeMenuKey: "/customers/orders",
    breadcrumbs: [
      { label: "Orders", href: "/customers/orders" },
      {
        label: params?.segmentLabel || "Details",
      },
    ],
  }),

  "/customers/profile": profileLayoutConfig("/customers"),
};
