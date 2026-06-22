"use client";

import { Loader2, Save } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

import { ErrorCard } from "@/components/ErrorCard";
import { PageHeading } from "@/components/PageHeading";
import { PageLoading } from "@/components/PageLoading";
import { Button } from "@/components/ui/button";
import { ProductVariantForm } from "@/features/product-variants/components/ProductVariantForm";
import { useCreateProductVariant } from "@/features/product-variants/mutations";
import { ProductVariantFormValues } from "@/features/product-variants/schemas";
import { CreateProductVariantRequest } from "@/features/product-variants/types";
import { useProductAttributes } from "@/features/products/queries";
import { usePageLayout } from "@/hooks";
import { handleApiError } from "@/utils";

export default function NewProductVariantPage() {
  const { id: productId } = useParams<{ id: string }>();
  const router = useRouter();

  usePageLayout();

  const productAttributesQuery = useProductAttributes(productId);
  const createProductVariantMutation = useCreateProductVariant();

  const isLoading = productAttributesQuery.isLoading;
  const isCreating = createProductVariantMutation.isPending;

  const handleSubmit = (values: Partial<ProductVariantFormValues>) => {
    createProductVariantMutation.mutate(
      { productId, data: values as CreateProductVariantRequest },
      {
        onSuccess: () => {
          toast.success("Product variant created successfully!");
          router.push(`/admin/products/${productId}/variants`);
        },
        onError: (error) =>
          handleApiError(error, "Failed to create product variant"),
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

  return (
    <div className="max-w-230">
      <div className="flex justify-between items-start mb-4">
        <div>
          <PageHeading className="mb-2">New variant</PageHeading>
          <p className="text-muted-foreground text-sm">
            Fill in the details to add a new variant to this product
          </p>
        </div>

        <Button
          size="lg"
          type="submit"
          form="product-variant-form"
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

      <ProductVariantForm
        variant={null}
        attributes={productAttributesQuery.data ?? []}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
