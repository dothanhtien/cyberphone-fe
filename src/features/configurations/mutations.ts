import { useMutation, useQueryClient } from "@tanstack/react-query";

import { configurationsApi } from "./api";
import { SyncSlidersRequest } from "./types";
import { queryKeys } from "@/lib/react-query/queryKeys";

export const useSyncSliders = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: SyncSlidersRequest) => configurationsApi.syncSliders(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.configurations.sliders() });
    },
  });
};
