import { useMutation, useQueryClient } from "@tanstack/react-query";

import { profileApi } from "./api";
import { queryKeys } from "@/lib/react-query/queryKeys";

export const useUpdateProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: profileApi.update,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.profile.me() });
    },
  });
};
