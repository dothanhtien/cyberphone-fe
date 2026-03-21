"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

import { Button } from "@/components/ui/button";
import { ErrorCard } from "@/components/ErrorCard";
import { PageHeading } from "@/components/PageHeading";
import { PageLoading } from "@/components/PageLoading";
import { useBrands } from "@/features/brands/queries";
import { useCategories } from "@/features/categories/queries";
import { MediaRefType } from "@/features/media/enums";
import { useMedia } from "@/features/media/hooks/useMedia";
import { ProductForm } from "@/features/products/components/ProductForm";
import { useCreateProduct } from "@/features/products/mutations";
import { CreateProductFormValues } from "@/features/products/schemas";
import { handleApiError } from "@/utils";

export default function NewProductPage() {
  const tempId = useMemo(() => uuidv4(), []);
  const router = useRouter();

  const brandsQuery = useBrands({ page: 1, limit: 1000 });
  const categoriesQuery = useCategories({ page: 1, limit: 1000 });

  const createProductMutation = useCreateProduct();

  const {
    mediaItems,
    isLoadingMediaItems,
    fetchMediaItems,
    uploadMediaItems,
    isUploadingMediaItems,
    deleteMediaItem,
    isDeletingMediaItem,
  } = useMedia({
    refType: MediaRefType.PRODUCT,
    refId: tempId,
    isTemporary: true,
  });

  const isLoading = brandsQuery.isLoading || categoriesQuery.isLoading;

  const brands = brandsQuery.data?.items ?? [];
  const categories = categoriesQuery.data?.items ?? [];

  const isCreating = createProductMutation.isPending;

  const handleCreateProduct = (data: Partial<CreateProductFormValues>) => {
    const dataToCreate = { ...data, id: tempId } as CreateProductFormValues;
    
    createProductMutation.mutate(dataToCreate, {
      onSuccess: (data) => {
        toast.success("Product created successfully!");
        router.push(`/admin/products/${data.id}/edit`);
      },
      onError: (error) =>
        handleApiError(error, "An error occurred when creating product"),
    });
  };

  if (isLoading) {
    return <PageLoading />;
  }

  if (!isLoading && (brandsQuery.isError || categoriesQuery.isError)) {
    return (
      <ErrorCard title="An error occurred when fetcing brands or categories. Please try again." />
    );
  }

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
          disabled={isCreating}
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

      <ProductForm
        categories={categories}
        brands={brands}
        onSubmit={handleCreateProduct}
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
