import { useMutation, useQueryClient } from "@tanstack/react-query";

import { queryKeys } from "@/lib/react-query/queryKeys";
import { Media, UploadMediaItemsParams } from "./types";
import { mediaApi } from "./api";

export const useUploadMediaItems = () => {
  const queryClient = useQueryClient();

  return useMutation<Media[], Error, UploadMediaItemsParams>({
    mutationFn: (data) => mediaApi.uploadMediaItems(data),
    onSuccess: (newMedia, variables) => {
      const queryKey = queryKeys.media.getMediaItems({
        refType: variables.refType,
        refId: variables.refId,
        isTemporary: variables.isTemporary,
      });

      queryClient.setQueryData<Media[]>(queryKey, (old) => {
        if (!old) return newMedia;

        return [...newMedia, ...old];
      });
    },
  });
};

export const useDeleteMediaItem = ({
  refType,
  refId,
  isTemporary,
}: {
  refType: string;
  refId: string;
  isTemporary?: boolean;
}) => {
  const queryClient = useQueryClient();

  return useMutation<boolean, Error, string>({
    mutationFn: (id) => mediaApi.deleteMediaItem(id),
    onSuccess: (_, id) => {
      const queryKey = queryKeys.media.getMediaItems({
        refType,
        refId,
        isTemporary,
      });

      queryClient.setQueryData<Media[]>(queryKey, (old) => {
        if (!old) return old;

        return old.filter((item) => item.id !== id);
      });
    },
  });
};
