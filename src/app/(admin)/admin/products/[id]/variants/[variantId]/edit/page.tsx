"use client";

import { Loader2, Save } from "lucide-react";
import { useParams } from "next/navigation";
import { toast } from "sonner";

import { ErrorCard } from "@/components/ErrorCard";
import { PageHeading } from "@/components/PageHeading";
import { PageLoading } from "@/components/PageLoading";
import { Button } from "@/components/ui/button";
import { useProductAttributes } from "@/features/products/queries";
import { ProductVariantForm } from "@/features/product-variants/components/ProductVariantForm";
import { useUpdateProductVariant } from "@/features/product-variants/mutations";
import { useProductVariantDetails } from "@/features/product-variants/queries";
import { ProductVariantFormValues } from "@/features/product-variants/schemas";
import { usePageLayout } from "@/hooks";
import { handleApiError } from "@/utils";

export default function EditProductVariantPage() {
  const { id: productId, variantId } = useParams<{
    id: string;
    variantId: string;
  }>();

  const productAttributesQuery = useProductAttributes(productId);
  const productVariantQuery = useProductVariantDetails(variantId);
  const updateProductVariantMutation = useUpdateProductVariant();

  const isLoading =
    productVariantQuery.isLoading || productAttributesQuery.isLoading;
  const isUpdating = updateProductVariantMutation.isPending;

  usePageLayout({ segmentLabel: productVariantQuery.data?.name });

  const handleSubmit = (values: Partial<ProductVariantFormValues>) => {
    updateProductVariantMutation.mutate(
      { productId, variantId, data: values },
      {
        onSuccess: () => {
          toast.success("Product variant updated successfully!");
        },
        onError: (error) =>
          handleApiError(
            error,
            "An error occurred when updating product variant",
          ),
      },
    );
  };

  if (isLoading) {
    return <PageLoading />;
  }

  if (productAttributesQuery.isError) {
    return (
      <ErrorCard title="An error occurred when fetching product attributes. Please try again." />
    );
  }

  if (productVariantQuery.isError || !productVariantQuery.data) {
    return <ErrorCard title="Product variant not found. Please try again." />;
  }

  return (
    <div className="max-w-230">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4">
        <div>
          <PageHeading className="mb-2">Edit variant</PageHeading>
          <p className="text-muted-foreground text-sm">
            Update the details of this product variant
          </p>
        </div>

        <Button
          size="lg"
          type="submit"
          form="product-variant-form"
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

      <ProductVariantForm
        variant={productVariantQuery.data ?? null}
        attributes={productAttributesQuery.data ?? []}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
