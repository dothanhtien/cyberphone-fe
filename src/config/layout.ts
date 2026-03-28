import { BreadcrumbItem } from "@/types";

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
};
