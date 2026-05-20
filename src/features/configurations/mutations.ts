import { useMutation, useQueryClient } from "@tanstack/react-query";

import { configurationsApi } from "./api";
import {
  SyncStorefrontConfigurationsRequest,
  SyncStorefrontSlidersRequest,
} from "./types";
import { queryKeys } from "@/lib/react-query/queryKeys";

export const useSyncStorefrontSliders = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SyncStorefrontSlidersRequest) =>
      configurationsApi.syncStorefrontSliders(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.configurations.sliders(),
      });
    },
  });
};

export const useSyncStorefrontConfigurations = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SyncStorefrontConfigurationsRequest) =>
      configurationsApi.syncStorefrontConfigurations(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.configurations.allItems(),
      });
    },
  });
};
