import { useQuery } from "@tanstack/react-query";

import { configurationsApi } from "./api";
import { StorefrontConfigurationSection } from "./enums";
import { StorefrontCategoryPanelItem, StorefrontProductSection } from "./types";
import { queryKeys } from "@/lib/react-query/queryKeys";

export const useAllStorefrontConfigurations = () => {
  return useQuery({
    queryKey: queryKeys.configurations.allItems(),
    queryFn: () => configurationsApi.findAllStorefrontConfigurations(),
  });
};

export const useStorefrontSliders = () => {
  return useQuery({
    queryKey: queryKeys.configurations.sliders(),
    queryFn: () => configurationsApi.findAllStorefrontSliders(),
  });
};

export const useStorefrontConfigurations = <
  T = StorefrontProductSection | StorefrontCategoryPanelItem,
>(
  type: StorefrontConfigurationSection,
) => {
  return useQuery({
    queryKey: queryKeys.configurations.items(type),
    queryFn: () => configurationsApi.findStorefrontConfigurations<T>(type),
  });
};
