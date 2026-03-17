"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

import { Button } from "@/components/ui/button";
import { PageHeading } from "@/components/PageHeading";
import { BrandForm } from "@/features/brands/components/BrandForm";
import { CreateBrandFormValues } from "@/features/brands/schemas";
import { useCreateBrand } from "@/features/brands/mutations";
import { handleApiError } from "@/utils";
import { useMediaItems } from "@/features/media/queries";
import { MediaRefType, MediaUsageType } from "@/features/media/enums";
import {
  useDeleteMediaItem,
  useUploadMediaItems,
} from "@/features/media/mutations";
import { CreateBrandRequest } from "@/features/brands/types";

export default function NewBrandPage() {
  const [shouldFetch, setShouldFetch] = useState(false);
  const tempId = useMemo(() => uuidv4(), []);
  const router = useRouter();

  const createBrandMutation = useCreateBrand();
  const isSubmitting = createBrandMutation.isPending;

  const {
    data: mediaItems,
    isLoading: isLoadingMediaItems,
    isError: isFetchError,
  } = useMediaItems(
    {
      refType: MediaRefType.BRAND,
      refId: tempId,
      isTemporary: true,
    },
    { enabled: shouldFetch },
  );

  const uploadMediaItemsMutation = useUploadMediaItems();

  const deleteMediaItemMutation = useDeleteMediaItem({
    refType: MediaRefType.BRAND,
    refId: tempId,
    isTemporary: true,
  });

  useEffect(() => {
    if (isFetchError) {
      toast.error("An error occurred when fetching items");
    }
  }, [isFetchError]);

  const handleCreateBrand = (data: Partial<CreateBrandFormValues>) => {
    const dataToCreate = { ...data, id: tempId } as CreateBrandRequest;

    createBrandMutation.mutate(dataToCreate, {
      onSuccess: () => {
        toast.success("Brand created successfully!");
        router.push("/admin/brands");
      },
      onError: (error) =>
        handleApiError(error, "An error occurred when creating brand"),
    });
  };

  const handleUploadMediaItems = (files: File[]) => {
    uploadMediaItemsMutation.mutate(
      {
        refType: MediaRefType.BRAND,
        refId: tempId,
        usageType: MediaUsageType.DESCRIPTION,
        isTemporary: true,
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

  return (
    <div className="max-w-230">
      <div className="flex justify-between items-start mb-4">
        <div>
          <PageHeading className="mb-3">New brand</PageHeading>
          <p className="text-muted-foreground text-sm mb-3">
            Establish a new brand identity in your catalog
          </p>
        </div>

        <Button
          size="lg"
          type="submit"
          form="brand-form"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
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
        onSubmit={handleCreateBrand}
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
