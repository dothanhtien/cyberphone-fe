"use client";

import { Plus } from "lucide-react";
import { useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

import { PageHeading } from "@/components/PageHeading";
import { Button } from "@/components/ui/button";
import { ProductVariantsTable } from "@/features/product-variants/components/ProductVariantsTable";
import { useDeleteProductVariant } from "@/features/product-variants/mutations";
import { useProductVariants } from "@/features/product-variants/queries";
import { usePageLayout } from "@/hooks";
import { handleApiError } from "@/utils";

export default function ProductVariantsPage() {
  const params = useParams<{ id: string }>();
  const productId = params.id;
  const router = useRouter();

  usePageLayout(); // TODO: add segment for product name

  const { data: variants } = useProductVariants(productId);
  const deleteVariantMutation = useDeleteProductVariant();

  const handleDeleteVariant = useCallback(
    (variantId: string) => {
      deleteVariantMutation.mutate(
        { productId, variantId },
        {
          onSuccess: () => toast.success("Variant deleted successfully"),
          onError: (error) =>
            handleApiError(error, "An error occurred when deleting variant"),
        },
      );
    },
    [deleteVariantMutation, productId],
  );

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <PageHeading>Manage variants</PageHeading>

        <Button
          size="lg"
          onClick={() =>
            router.push(`/admin/products/${productId}/variants/new`)
          }
        >
          <Plus /> New variant
        </Button>
      </div>

      <ProductVariantsTable
        productId={productId}
        data={variants ?? []}
        onDelete={handleDeleteVariant}
      />
    </>
  );
}
