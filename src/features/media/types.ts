import { MediaRefType, MediaUsageType } from "./enums";

export interface GetMediaItemsParams {
  refType: MediaRefType;
  refId: string;
  isTemporary?: boolean;
}

export interface UploadMediaItemsParams {
  refType: string;
  refId: string;
  usageType: string;
  isTemporary?: boolean;
  files: File[];
}

export interface Media {
  id: string;
  url: string;
  refType: MediaRefType;
  refId: string;
  usageType: MediaUsageType;
  metaData: string | null;
  isActive: boolean;
  createdAt: string;
  createdBy: string;
  updatedAt: string | null;
  updatedBy: string | null;
}
