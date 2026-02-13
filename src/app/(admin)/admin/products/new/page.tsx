"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { PageHeading } from "@/components/PageHeading";
import { ProductForm } from "@/features/products/components/ProductForm";
import { useBrands } from "@/features/brands/queries";
import { useCategories } from "@/features/categories/queries";
import { useCreateProduct } from "@/features/products/mutations";
import { CreateProductFormValues } from "@/features/products/schemas";
import { ApiError } from "@/types";

export default function NewProductPage() {
  const router = useRouter();

  const {
    data: brandsData,
    isLoading: brandsLoading,
    isError: brandsError,
  } = useBrands({
    page: 1,
    limit: 100,
  });

  const {
    data: categoriesData,
    isLoading: categoriesLoading,
    isError: categoriesError,
  } = useCategories({
    page: 1,
    limit: 100,
  });

  const createMutation = useCreateProduct();

  useEffect(() => {
    if (categoriesError) {
      toast.error("Failed to fetch categories", {
        position: "top-right",
      });
    }

    if (brandsError) {
      toast.error("Failed to fetch brands", {
        position: "top-right",
      });
    }
  }, [categoriesError, brandsError]);

  if (categoriesLoading || brandsLoading) {
    return <div>Loading...</div>;
  }

  const isSubmitting = createMutation.isPending;

  const handleCreateProduct = (data: CreateProductFormValues) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        toast.success("Product created successfully!", {
          position: "top-right",
        });
        router.push("/admin/products");
      },
      onError: (error) => {
        const axiosError = error as AxiosError<ApiError>;
        console.error("Create product failed:", error);
        toast.error(
          axiosError.response?.data?.message || "Failed to create product",
          {
            position: "top-right",
          },
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
      />
    </div>
  );
}
