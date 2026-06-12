import { MediaRefType, MediaUsageType } from "./enums";

export interface GetMediaItemsParams {
  refType: MediaRefType;
  refId: string;
  isTemporary?: boolean;
}

export interface UploadMediaItemsParams {
  refType: MediaRefType;
  refId: string;
  usageType: MediaUsageType;
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
