import { useQuery } from "@tanstack/react-query";
import { GetMediaItemsParams } from "./types";
import { queryKeys } from "@/lib/react-query/queryKeys";
import { mediaApi } from "./api";

export const useMediaItems = (
  params: GetMediaItemsParams,
  options?: { enabled?: boolean },
) => {
  return useQuery({
    queryKey: queryKeys.media.getMediaItems(params),
    queryFn: () => mediaApi.getMediaItems(params),
    enabled: options?.enabled,
  });
};
