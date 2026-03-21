"use client";

import { useParams } from "next/navigation";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { ErrorCard } from "@/components/ErrorCard";
import { PageHeading } from "@/components/PageHeading";
import { PageLoading } from "@/components/PageLoading";
import { BrandForm } from "@/features/brands/components/BrandForm";
import { useUpdateBrand } from "@/features/brands/mutations";
import { useBrandDetails } from "@/features/brands/queries";
import { CreateBrandFormValues } from "@/features/brands/schemas";
import { MediaRefType } from "@/features/media/enums";
import { useMedia } from "@/features/media/hooks/useMedia";
import { handleApiError } from "@/utils";

export default function EditBrandPage() {
  const { id: brandId } = useParams<{ id: string }>();

  const brandQuery = useBrandDetails(brandId);

  const brand = brandQuery.data;

  const updateBrandMutation = useUpdateBrand();

  const {
    mediaItems,
    isLoadingMediaItems,
    fetchMediaItems,
    uploadMediaItems,
    isUploadingMediaItems,
    deleteMediaItem,
    isDeletingMediaItem,
  } = useMedia({ refType: MediaRefType.BRAND, refId: brandId });

  const isUpdating = updateBrandMutation.isPending;

  const handleUpdateBrand = (data: Partial<CreateBrandFormValues>) => {
    updateBrandMutation.mutate(
      { id: brandId, data },
      {
        onSuccess: () => toast.success("Brand updated successfully"),
        onError: (error) =>
          handleApiError(error, "An error occurred when updating brand"),
      },
    );
  };

  if (brandQuery.isLoading) {
    return <PageLoading />;
  }

  if (!brandQuery.isLoading && brandQuery.isError) {
    return <ErrorCard title="Brand not found. Please try again." />;
  }

  return (
    <div className="max-w-230">
      <div className="flex flex-col gap-4 mb-4 md:flex-row md:justify-between md:items-start">
        <div>
          <PageHeading className="mb-3">Edit brand</PageHeading>
          <p className="text-muted-foreground text-sm mb-3">
            Update the brand information in your catalog
          </p>
        </div>

        <Button
          size="lg"
          type="submit"
          form="brand-form"
          disabled={isUpdating}
          className="w-full sm:w-auto"
        >
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
        mediaItems={mediaItems}
        isLoadingMediaItems={isLoadingMediaItems}
        onFetchMediaItems={fetchMediaItems}
        onUploadMediaItems={uploadMediaItems}
        isUploadingMediaItems={isUploadingMediaItems}
        onDeleteMediaItem={deleteMediaItem}
        isDeletingMediaItem={isDeletingMediaItem}
      />
    </div>
  );
}
