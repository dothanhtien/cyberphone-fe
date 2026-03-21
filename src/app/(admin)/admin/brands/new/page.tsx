"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

import { Button } from "@/components/ui/button";
import { PageHeading } from "@/components/PageHeading";
import { BrandForm } from "@/features/brands/components/BrandForm";
import { useCreateBrand } from "@/features/brands/mutations";
import { CreateBrandFormValues } from "@/features/brands/schemas";
import { CreateBrandRequest } from "@/features/brands/types";
import { MediaRefType } from "@/features/media/enums";
import { useMedia } from "@/features/media/hooks/useMedia";
import { handleApiError } from "@/utils";

export default function NewBrandPage() {
  const tempId = useMemo(() => uuidv4(), []);
  const router = useRouter();

  const createBrandMutation = useCreateBrand();

  const {
    mediaItems,
    isLoadingMediaItems,
    fetchMediaItems,
    uploadMediaItems,
    isUploadingMediaItems,
    deleteMediaItem,
    isDeletingMediaItem,
  } = useMedia({
    refType: MediaRefType.BRAND,
    refId: tempId,
    isTemporary: true,
  });

  const isCreating = createBrandMutation.isPending;

  const handleCreateBrand = (data: Partial<CreateBrandFormValues>) => {
    const dataToCreate = { ...data, id: tempId } as CreateBrandRequest;

    createBrandMutation.mutate(dataToCreate, {
      onSuccess: () => {
        toast.success("Brand created successfully");
        router.push("/admin/brands");
      },
      onError: (error) =>
        handleApiError(error, "An error occurred when creating brand"),
    });
  };

  return (
    <div className="max-w-230">
      <div className="flex flex-col gap-4 mb-4 md:flex-row md:justify-between md:items-start">
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
          disabled={isCreating}
          className="w-full sm:w-auto"
        >
          {isCreating ? (
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
