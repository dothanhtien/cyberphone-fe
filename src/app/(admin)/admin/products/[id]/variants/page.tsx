"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import { AxiosError } from "axios";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { PageHeading } from "@/components/PageHeading";
import { ProductVariantsTable } from "@/features/product-variants/components/ProductVariantsTable";
import { useProductVariants } from "@/features/product-variants/queries";
import {
  useCreateProductVariant,
  useUpdateProductVariant,
} from "@/features/product-variants/mutations";
import { ProductVariant } from "@/features/product-variants/types";
import { ProductVariantFormValues } from "@/features/product-variants/schemas";
import { ProductVariantModal } from "@/features/product-variants/components/ProductVariantModal";
import { ApiError } from "@/types";

export default function ProductVariantsPage() {
  const params = useParams<{ id: string }>();
  const productId = params.id;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingVariant, setEditingVariant] = useState<ProductVariant | null>(
    null,
  );

  const isCreateMode = !editingVariant;

  const { data } = useProductVariants(productId);
  const createProductVariantMutation = useCreateProductVariant();
  const updateProductVariantMutation = useUpdateProductVariant();

  const handleOpenCreate = () => {
    setEditingVariant(null);
    setIsModalOpen(true);
  };

  const handleEditVariant = (variant: ProductVariant) => {
    setEditingVariant(variant);
    setIsModalOpen(true);
  };

  const handleCloseModal = (open: boolean) => {
    if (!open) {
      setEditingVariant(null);
    }
    setIsModalOpen(open);
  };

  const handleSubmit = (values: ProductVariantFormValues) => {
    if (isCreateMode) {
      createProductVariantMutation.mutate(
        {
          productId,
          data: values,
        },
        {
          onSuccess: () => {
            toast.success("Product variant created successfully!", {
              position: "top-right",
            });
            setIsModalOpen(false);
          },
          onError: (error) => {
            const axiosError = error as AxiosError<ApiError>;
            toast.error(
              axiosError.response?.data?.message ||
                "Failed to create product variant",
              { position: "top-right" },
            );
          },
        },
      );
    } else if (editingVariant) {
      updateProductVariantMutation.mutate(
        {
          productId,
          variantId: editingVariant.id,
          data: values,
        },
        {
          onSuccess: () => {
            toast.success("Product variant updated successfully!", {
              position: "top-right",
            });
            setIsModalOpen(false);
          },
          onError: (error) => {
            const axiosError = error as AxiosError<ApiError>;
            toast.error(
              axiosError.response?.data?.message ||
                "Failed to update product variant",
              { position: "top-right" },
            );
          },
        },
      );
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <PageHeading>Manage variants</PageHeading>

        <Button size="lg" onClick={handleOpenCreate}>
          <Plus /> Add variant
        </Button>
      </div>

      <ProductVariantsTable data={data ?? []} onEdit={handleEditVariant} />

      <ProductVariantModal
        mode={isCreateMode ? "create" : "update"}
        open={isModalOpen}
        variant={editingVariant}
        onOpenChange={handleCloseModal}
        onSubmit={handleSubmit}
      />
    </>
  );
}
