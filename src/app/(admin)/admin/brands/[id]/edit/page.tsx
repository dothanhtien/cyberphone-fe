"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { AlertCircleIcon, Loader2, Save } from "lucide-react";
import { toast } from "sonner";

import { Alert, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { PageHeading } from "@/components/PageHeading";
import { BrandForm } from "@/features/brands/components/BrandForm";
import { CreateBrandFormValues } from "@/features/brands/schemas";
import { useUpdateBrand } from "@/features/brands/mutations";
import { useBrandDetails } from "@/features/brands/queries";
import { useMediaItems } from "@/features/media/queries";
import {
  useDeleteMediaItem,
  useUploadMediaItems,
} from "@/features/media/mutations";
import { MediaRefType, MediaUsageType } from "@/features/media/enums";
import { handleApiError } from "@/utils";

export default function EditBrandPage() {
  const params = useParams<{ id: string }>();
  const brandId = params.id;
  const updateBrandMutation = useUpdateBrand();
  const isUpdating = updateBrandMutation.isPending;

  const { data: brand, isLoading, isError } = useBrandDetails(brandId);

  const [shouldFetch, setShouldFetch] = useState(false);

  const {
    data: mediaItems,
    isLoading: isLoadingMediaItems,
    isError: isFetchMediaItemsError,
  } = useMediaItems(
    { refType: MediaRefType.BRAND, refId: brandId },
    { enabled: shouldFetch },
  );

  const uploadMediaItemsMutation = useUploadMediaItems();

  const deleteMediaItemMutation = useDeleteMediaItem({
    refType: MediaRefType.BRAND,
    refId: brandId,
  });

  useEffect(() => {
    if (isFetchMediaItemsError) {
      toast.error("An error occurred when fetching media items");
    }
  }, [isFetchMediaItemsError]);

  const handleUpdateBrand = (data: Partial<CreateBrandFormValues>) => {
    updateBrandMutation.mutate(
      { id: brandId, data },
      {
        onSuccess: () => toast.success("Brand updated successfully!"),
        onError: (error) =>
          handleApiError(error, "An error occurred when updating brand"),
      },
    );
  };

  const handleUploadMediaItems = (files: File[]) => {
    uploadMediaItemsMutation.mutate(
      {
        refType: MediaRefType.BRAND,
        refId: brandId,
        usageType: MediaUsageType.DESCRIPTION,
        files,
      },
      {
        onSuccess: () =>
          toast.success(
            `Upload media item${files.length > 1 && "s"} successfully`,
          ),
        onError: (error) =>
          handleApiError(error, "An error occurred when uploading media items"),
      },
    );
  };

  const handleDeleteMediaItem = (id: string) => {
    deleteMediaItemMutation.mutate(id, {
      onSuccess: () => toast.success("Delete media item successfully"),
      onError: (error) =>
        handleApiError(error, "An error occurred when deleting media item"),
    });
  };

  if (isLoading) {
    return (
      <div className="h-full flex justify-center items-center">
        <div className="flex items-center gap-2">
          <Spinner className="size-6" />
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  if (!isLoading && (isError || !brand)) {
    return (
      <Alert variant="destructive" className="max-w-md py-4">
        <AlertCircleIcon className="h-4 w-4" />
        <AlertTitle>Brand not found. Please try again.</AlertTitle>
      </Alert>
    );
  }

  return (
    <div className="max-w-230">
      <div className="flex justify-between items-start mb-4">
        <div>
          <PageHeading className="mb-3">Edit brand</PageHeading>
          <p className="text-muted-foreground text-sm mb-3">
            Update the brand information in your catalog
          </p>
        </div>

        <Button size="lg" type="submit" form="brand-form" disabled={isUpdating}>
          {isUpdating ? (
            <>
              <Loader2 className="animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save />
              Save changes
            </>
          )}
        </Button>
      </div>

      <BrandForm
        brand={brand}
        onSubmit={handleUpdateBrand}
        mediaItems={mediaItems ?? []}
        isLoadingMediaItems={isLoadingMediaItems}
        onFetchMediaItems={() => setShouldFetch(true)}
        onUploadMediaItems={handleUploadMediaItems}
        isUploadingMediaItems={uploadMediaItemsMutation.isPending}
        onDeleteMediaItem={handleDeleteMediaItem}
        isDeletingMediaItem={deleteMediaItemMutation.isPending}
      />
    </div>
  );
}
