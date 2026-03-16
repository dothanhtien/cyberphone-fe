import { apiClient } from "@/lib/axios/client";
import { GetMediaItemsParams, Media, UploadMediaItemsParams } from "./types";

export const mediaApi = {
  getMediaItems: async (params: GetMediaItemsParams): Promise<Media[]> => {
    return apiClient.get("/media", { params });
  },

  uploadMediaItems: async (
    params: UploadMediaItemsParams,
  ): Promise<Media[]> => {
    const formData = new FormData();

    formData.append("refId", params.refId);
    formData.append("refType", params.refType);
    formData.append("usageType", params.usageType);

    params.files.forEach((file) => {
      formData.append("files", file);
    });

    return apiClient.post("/media/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  deleteMediaItem: async (id: string): Promise<void> => {
    return apiClient.delete(`/media/${id}`);
  },
};
