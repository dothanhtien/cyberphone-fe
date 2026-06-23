export interface ImageItem {
  id: string;
  file?: File;
  preview?: string | null;
  isMain: boolean;
  url?: string | null;
  altText?: string;
  isDeleted?: boolean;
}
