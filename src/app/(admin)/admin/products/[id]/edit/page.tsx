"use client";

import { Loader2, Save, Settings } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { ErrorCard } from "@/components/ErrorCard";
import { PageLoading } from "@/components/PageLoading";
import { PageHeading } from "@/components/PageHeading";
import { ProductForm } from "@/features/products/components/ProductForm";
import { useBrands } from "@/features/brands/queries";
import { useCategories } from "@/features/categories/queries";
import { useProductDetails } from "@/features/products/queries";
import { CreateProductFormValues } from "@/features/products/schemas";
import { useUpdateProduct } from "@/features/products/mutations";
import { handleApiError } from "@/utils";
import { MediaRefType } from "@/features/media/enums";
import { useMedia } from "@/features/media/hooks/useMedia";

export default function EditProductPage() {
  const { id: productId } = useParams<{ id: string }>();
  const router = useRouter();

  const productQuery = useProductDetails(productId);
  const brandsQuery = useBrands({ page: 1, limit: 1000 });
  const categoriesQuery = useCategories({ page: 1, limit: 1000 });

  const updateProductMutation = useUpdateProduct();

  const {
    mediaItems,
    isLoadingMediaItems,
    fetchMediaItems,
    uploadMediaItems,
    isUploadingMediaItems,
    deleteMediaItem,
    isDeletingMediaItem,
  } = useMedia({ refType: MediaRefType.PRODUCT, refId: productId });

  const isLoading =
    productQuery.isLoading ||
    brandsQuery.isLoading ||
    categoriesQuery.isLoading;

  const product = productQuery.data;
  const brands = brandsQuery.data?.items ?? [];
  const categories = categoriesQuery.data?.items ?? [];

  const isUpdating = updateProductMutation.isPending;

  const handleUpdateProduct = (values: Partial<CreateProductFormValues>) => {
    updateProductMutation.mutate(
      { id: productId, data: values },
      {
        onSuccess: () => toast.success("Product updated successfully"),
        onError: (error) =>
          handleApiError(error, "An error occurred when updating product"),
      },
    );
  };

  if (isLoading) {
    return <PageLoading />;
  }

  if (!isLoading && (productQuery.isError || !productQuery.data)) {
    return <ErrorCard title="Product not found. Please try again." />;
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
        categories={categories}
        brands={brands}
        onSubmit={handleUpdateProduct}
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
