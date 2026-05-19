import { StorefrontConfigurationSection } from "./enums";

export type StorefrontConfigurations = {
  [StorefrontConfigurationSection.PRODUCT_SECTIONS]: StorefrontProductSection[];
  [StorefrontConfigurationSection.CATEGORIES_PANEL]: StorefrontCategoryPanelItem[];
};

export interface StorefrontSlider {
  id: string;
  title: string | null;
  altText: string | null;
  url: string | null;
  displayOrder: number;
  isActive: boolean;
  createdBy: string;
  createdAt: string;
  updatedBy: string | undefined;
  updatedAt: string | undefined;
}

export interface StorefrontCategoryChild {
  id: string;
  name: string;
  slug: string;
}

export interface StorefrontCategoryPanelItem {
  id: string;
  categoryId: string | null;
  categorySlug: string | null;
  categoryName: string | null;
  icon: string | null;
  displayOrder: number;
  enabled: boolean;
  children: StorefrontCategoryChild[];
}

export interface StorefrontProductSection {
  id: string;
  categoryId: string | null;
  categorySlug: string | null;
  categoryName: string | null;
  title: string | null;
  displayOrder: number;
  enabled: boolean;
}

export interface SyncStorefrontSlidersRequest {
  images?: File[];
  items?: {
    id: string;
    title?: string | null;
    altText?: string | null;
    displayOrder: number;
    isDeactivated?: boolean;
    isDeleted?: boolean;
  }[];
}

export interface SyncStorefrontConfigurationsRequest {
  items: {
    categoryId: string;
    title?: string;
    icon?: string;
    displayOrder: number;
    enabled: boolean;
    type: StorefrontConfigurationSection;
    isDeleted?: boolean;
  }[];
}
