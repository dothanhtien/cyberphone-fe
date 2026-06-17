import { useQuery } from "@tanstack/react-query";

import { profileApi } from "./api";
import { queryKeys } from "@/lib/react-query/queryKeys";

export const useProfile = () => {
  return useQuery({
    queryKey: queryKeys.profile.me(),
    queryFn: profileApi.get,
  });
};
