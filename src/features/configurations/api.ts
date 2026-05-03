import { apiClient } from "@/lib/axios/client";
import { Slider, SyncSlidersRequest } from "./types";

export const configurationsApi = {
  syncSliders: async (data: SyncSlidersRequest) => {
    const formData = new FormData();

    if (data.images?.length) {
      data.images.forEach((file) => {
        formData.append("images", file);
      });
    }

    if (data.items?.length) {
      formData.append("items", JSON.stringify(data.items));
    }

    return apiClient.post("/admin/storefront-config/sliders", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  findAllSliders: async () => {
    return apiClient.get<Slider[]>("/admin/storefront-config/sliders");
  },
};
