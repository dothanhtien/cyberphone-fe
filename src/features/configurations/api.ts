import { apiClient } from "@/lib/axios/client";
import { StorefrontConfigurationSection } from "./enums";
import {
  StorefrontConfigurations,
  SyncStorefrontConfigurationsRequest,
  StorefrontSlider,
  SyncStorefrontSlidersRequest,
  StorefrontCategoryPanelItem,
  StorefrontProductSection,
} from "./types";

export const configurationsApi = {
  syncStorefrontSliders: async (data: SyncStorefrontSlidersRequest) => {
    const formData = new FormData();

    if (data.images?.length) {
      data.images.forEach((file) => {
        formData.append("images", file);
      });
    }

    if (data.items?.length) {
      formData.append("items", JSON.stringify(data.items));
    }

    return apiClient.post("/storefront-configurations/sliders", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  findAllStorefrontSliders: async () => {
    return apiClient.get<StorefrontSlider[]>(
      "/storefront-configurations/sliders",
    );
  },

  syncStorefrontConfigurations: async (
    data: SyncStorefrontConfigurationsRequest,
  ) => {
    return apiClient.post("/storefront-configurations", data);
  },

  findStorefrontConfigurations: async <
    T = StorefrontProductSection | StorefrontCategoryPanelItem,
  >(
    type: StorefrontConfigurationSection,
  ) => {
    return apiClient.get<T[]>(`/storefront-configurations?type=${type}`);
  },

  findAllStorefrontConfigurations: async () => {
    return apiClient.get<StorefrontConfigurations>(
      "/storefront-configurations",
    );
  },
};
