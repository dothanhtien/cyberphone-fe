"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { Plus } from "lucide-react";
import { AxiosError } from "axios";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { PageHeading } from "@/components/PageHeading";
import { ProductVariantsTable } from "@/features/product-variants/components/ProductVariantsTable";
import { ProductVariantModal } from "@/features/product-variants/components/ProductVariantModal";
import { useProductVariants } from "@/features/product-variants/queries";
import { useCreateProductVariant } from "@/features/product-variants/mutations";
import { CreateProductVariantFormValues } from "@/features/product-variants/schemas";
import { ApiError } from "@/types";

export default function ProductVariantsPage() {
  const params = useParams<{ id: string }>();
  const productId = params.id;

  const [open, setOpen] = useState(false);
  const { data } = useProductVariants(productId);

  const createProductVariantMutation = useCreateProductVariant();

  const handleCreateProductVariant = (
    data: CreateProductVariantFormValues,
    onCloseModal?: () => void,
  ) => {
    createProductVariantMutation.mutate(data, {
      onSuccess: () => {
        toast.success("Product variant created successfully!", {
          position: "top-right",
        });

        onCloseModal?.();
      },
      onError: (error) => {
        const axiosError = error as AxiosError<ApiError>;
        console.error("Create product variant failed:", error);
        toast.error(
          axiosError.response?.data?.message ||
            "Failed to create product variant",
          {
            position: "top-right",
          },
        );
      },
    });
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <PageHeading>Manage variants</PageHeading>

        <Button size="lg" onClick={() => setOpen(true)}>
          <Plus /> Add variant
        </Button>
      </div>

      <ProductVariantsTable data={data ?? []} />

      <ProductVariantModal
        productId={productId}
        open={open}
        onOpenChange={setOpen}
        onSubmit={(values) =>
          handleCreateProductVariant(values, () => setOpen(false))
        }
      />
    </>
  );
}
