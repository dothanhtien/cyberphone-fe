export interface Slider {
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

export interface SyncSlidersRequest {
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
