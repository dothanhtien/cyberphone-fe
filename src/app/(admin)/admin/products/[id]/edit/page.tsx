"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { AlertCircleIcon, Loader2, Save, Settings } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { PageHeading } from "@/components/PageHeading";
import { ProductForm } from "@/features/products/components/ProductForm";
import { useBrands } from "@/features/brands/queries";
import { useCategories } from "@/features/categories/queries";
import { useProductDetails } from "@/features/products/queries";
import { Spinner } from "@/components/ui/spinner";
import { CreateProductFormValues } from "@/features/products/schemas";
import { useUpdateProduct } from "@/features/products/mutations";
import { handleApiError } from "@/utils";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { useMediaItems } from "@/features/media/queries";
import { MediaRefType, MediaUsageType } from "@/features/media/enums";
import {
  useDeleteMediaItem,
  useUploadMediaItems,
} from "@/features/media/mutations";

export default function EditProductPage() {
  const params = useParams<{ id: string }>();
  const productId = params.id;
  const router = useRouter();
  const isUpdating = false;

  const { data: product, isLoading, isError } = useProductDetails(productId);

  const [shouldFetch, setShouldFetch] = useState(false);

  const { data: brandsData, isLoading: brandsLoading } = useBrands({
    page: 1,
    limit: 100,
  });

  const { data: categoriesData, isLoading: categoriesLoading } = useCategories({
    page: 1,
    limit: 100,
  });

  const updateProductMutation = useUpdateProduct();

  const handleUpdateProduct = (values: Partial<CreateProductFormValues>) => {
    updateProductMutation.mutate(
      { id: productId, data: values },
      {
        onSuccess: () => toast.success("Update product successfully"),
        onError: (error) =>
          handleApiError(error, "An error occurred when updating product"),
      },
    );
  };

  const {
    data: mediaItems,
    isLoading: isLoadingMediaItems,
    isError: isFetchMediaItemsError,
  } = useMediaItems(
    { refType: MediaRefType.PRODUCT, refId: productId },
    { enabled: shouldFetch },
  );

  const uploadMediaItemsMutation = useUploadMediaItems();

  const deleteMediaItemMutation = useDeleteMediaItem({
    refType: MediaRefType.PRODUCT,
    refId: productId,
  });

  useEffect(() => {
    if (isFetchMediaItemsError) {
      toast.error("An error occurred when fetching media items");
    }
  }, [isFetchMediaItemsError]);

  const handleUploadMediaItems = (files: File[]) => {
    uploadMediaItemsMutation.mutate(
      {
        refType: MediaRefType.PRODUCT,
        refId: productId,
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

  if (isLoading || brandsLoading || categoriesLoading) {
    return (
      <div className="h-full flex justify-center items-center">
        <div className="flex items-center gap-2">
          <Spinner className="size-6" />
          <span>Loading...</span>
        </div>
      </div>
    );
  }

  if (!isLoading && (isError || !product)) {
    return (
      <Alert variant="destructive" className="max-w-md py-4">
        <AlertCircleIcon className="h-4 w-4" />
        <AlertTitle>Product not found. Please try again.</AlertTitle>
      </Alert>
    );
  }

  return (
    <div className="max-w-230">
      <div className="flex flex-col gap-4 mb-4 md:flex-row md:justify-between md:items-start">
        <div>
          <PageHeading className="mb-2">Edit product</PageHeading>
          <p className="text-muted-foreground text-sm">
            Update the details of this product in your catalog
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row sm:flex-wrap md:justify-end">
          <Button
            size="lg"
            type="button"
            className="w-full sm:w-auto"
            onClick={() => router.push(`/admin/products/${productId}/variants`)}
          >
            <Settings className="mr-2 h-4 w-4" />
            Manage variants
          </Button>

          <Button
            size="lg"
            type="submit"
            form="product-form"
            disabled={isUpdating}
            className="w-full sm:w-auto"
          >
            {isUpdating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save changes
              </>
            )}
          </Button>
        </div>
      </div>

      <ProductForm
        product={product}
        categories={categoriesData?.items ?? []}
        brands={brandsData?.items ?? []}
        onSubmit={handleUpdateProduct}
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
