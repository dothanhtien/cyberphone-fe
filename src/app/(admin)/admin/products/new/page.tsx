"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { AlertCircleIcon, Loader2, Save } from "lucide-react";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { PageHeading } from "@/components/PageHeading";
import { ProductForm } from "@/features/products/components/ProductForm";
import { useBrands } from "@/features/brands/queries";
import { useCategories } from "@/features/categories/queries";
import { useCreateProduct } from "@/features/products/mutations";
import { CreateProductFormValues } from "@/features/products/schemas";
import { ApiError } from "@/types";
import { handleApiError } from "@/utils";
import { MediaRefType, MediaUsageType } from "@/features/media/enums";
import { useMediaItems } from "@/features/media/queries";
import {
  useDeleteMediaItem,
  useUploadMediaItems,
} from "@/features/media/mutations";

export default function NewProductPage() {
  const router = useRouter();
  const tempId = useMemo(() => uuidv4(), []);
  const [shouldFetch, setShouldFetch] = useState(false);

  const {
    data: brandsData,
    isLoading: brandsLoading,
    isError: brandsError,
  } = useBrands({
    page: 1,
    limit: 1000,
  });

  const {
    data: categoriesData,
    isLoading: categoriesLoading,
    isError: categoriesError,
  } = useCategories({
    page: 1,
    limit: 1000,
  });

  const createProductMutation = useCreateProduct();

  const {
    data: mediaItems,
    isLoading: isLoadingMediaItems,
    isError: isFetchError,
  } = useMediaItems(
    {
      refType: MediaRefType.PRODUCT,
      refId: tempId,
      isTemporary: true,
    },
    { enabled: shouldFetch },
  );

  const uploadMediaItemsMutation = useUploadMediaItems();

  const deleteMediaItemMutation = useDeleteMediaItem({
    refType: MediaRefType.PRODUCT,
    refId: tempId,
    isTemporary: true,
  });

  useEffect(() => {
    if (isFetchError) {
      toast.error("An error occurred when fetching items");
    }
  }, [isFetchError]);

  const handleUploadMediaItems = (files: File[]) => {
    uploadMediaItemsMutation.mutate(
      {
        refType: MediaRefType.PRODUCT,
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

  if (categoriesLoading || brandsLoading) {
    return <div>Loading...</div>;
  }

  if (categoriesError || brandsError) {
    return (
      <Alert variant="destructive" className="max-w-md">
        <AlertCircleIcon />
        <AlertDescription>
          Failed to load required data. Please try again.
        </AlertDescription>
      </Alert>
    );
  }

  const isSubmitting = createProductMutation.isPending;

  const handleCreateProduct = (data: Partial<CreateProductFormValues>) => {
    const dataToCreate = { ...data, id: tempId } as CreateProductFormValues;
    createProductMutation.mutate(dataToCreate, {
      onSuccess: (data) => {
        toast.success("Product created successfully!");
        router.push(`/admin/products/${data.id}/edit`);
      },
      onError: (error) => {
        const axiosError = error as AxiosError<ApiError>;
        console.error("Create product failed:", error);
        toast.error(
          axiosError.response?.data?.message || "Failed to create product",
        );
      },
    });
  };

  return (
    <div className="max-w-230">
      <div className="flex justify-between items-start mb-4">
        <div>
          <PageHeading className="mb-3">New product</PageHeading>
          <p className="text-muted-foreground text-sm mb-3">
            Fill in the details to add a new product to your catalog
          </p>
        </div>

        <Button
          size="lg"
          type="submit"
          form="product-form"
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

      <ProductForm
        categories={categoriesData?.items ?? []}
        brands={brandsData?.items ?? []}
        onSubmit={handleCreateProduct}
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
