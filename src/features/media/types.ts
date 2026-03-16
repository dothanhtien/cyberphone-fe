export interface GetMediaItemsParams {
  refType: string;
  refId: string;
}

export interface UploadMediaItemsParams {
  refType: string;
  refId: string;
  usageType: string;
  files: File[];
}

export interface Media {
  id: string;
  url: string;
  refType: string;
  refId: string;
  usageType: string;
  metaData: string | null;
  isActive: boolean;
  createdAt: string;
  createdBy: string;
  updatedAt: string | null;
  updatedBy: string | null;
}
