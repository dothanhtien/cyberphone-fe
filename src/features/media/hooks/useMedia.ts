import { useState, useEffect, useCallback } from "react";
import { toast } from "sonner";

import { MediaRefType, MediaUsageType } from "@/features/media/enums";
import {
  useUploadMediaItems,
  useDeleteMediaItem,
} from "@/features/media/mutations";
import { useMediaItems } from "@/features/media/queries";
import { handleApiError } from "@/utils";

interface UseMediaProps {
  refId: string;
  refType: MediaRefType;
  usageType?: MediaUsageType;
  isTemporary?: boolean;
}

export function useMedia({
  refId,
  refType,
  usageType = MediaUsageType.DESCRIPTION,
  isTemporary,
}: UseMediaProps) {
  const [shouldFetch, setShouldFetch] = useState(false);

  const {
    data: mediaItems,
    isLoading: isLoadingMediaItems,
    isError: isMediaItemsError,
  } = useMediaItems({ refType, refId, isTemporary }, { enabled: shouldFetch });

  const uploadMediaItemsMutation = useUploadMediaItems();
  const deleteMediaItemMutation = useDeleteMediaItem({
    refType,
    refId,
    isTemporary,
  });

  useEffect(() => {
    if (isMediaItemsError)
      toast.error("An error occurred when fetching media items");
  }, [isMediaItemsError]);

  const fetchMediaItems = useCallback(() => setShouldFetch(true), []);

  const uploadMediaItems = useCallback(
    (files: File[]) => {
      uploadMediaItemsMutation.mutate(
        {
          refType,
          refId,
          usageType,
          isTemporary,
          files,
        },
        {
          onSuccess: () =>
            toast.success(
              `Upload media item${files.length > 1 ? "s" : ""} successfully`,
            ),
          onError: (error) =>
            handleApiError(
              error,
              "An error occurred when uploading media items",
            ),
        },
      );
    },
    [refId, refType, usageType, isTemporary, uploadMediaItemsMutation],
  );

  const deleteMediaItem = useCallback(
    (id: string) => {
      deleteMediaItemMutation.mutate(id, {
        onSuccess: () => toast.success("Delete media item successfully"),
        onError: (error) =>
          handleApiError(error, "An error occurred when deleting media item"),
      });
    },
    [deleteMediaItemMutation],
  );

  return {
    mediaItems: mediaItems ?? [],
    isLoadingMediaItems,
    fetchMediaItems,
    uploadMediaItems,
    isUploadingMediaItems: uploadMediaItemsMutation.isPending,
    deleteMediaItem,
    isDeletingMediaItem: deleteMediaItemMutation.isPending,
  };
}
