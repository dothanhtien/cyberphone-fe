"use client";

import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { PageHeading } from "@/components/PageHeading";
import { BrandForm } from "@/features/brands/components/BrandForm";
import { CreateBrandFormValues } from "@/features/brands/schemas";
import { useCreateBrand } from "@/features/brands/mutations";
import { ApiError } from "@/types";

export default function NewBrandPage() {
  const router = useRouter();
  const createMutation = useCreateBrand();
  const isSubmitting = createMutation.isPending;

  const handleCreateBrand = (data: CreateBrandFormValues) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        toast.success("Brand created successfully!", {
          position: "top-right",
        });
        router.push("/admin/brands");
      },
      onError: (error) => {
        const axiosError = error as AxiosError<ApiError>;
        console.error("Create brand failed:", error);
        toast.error(
          axiosError.response?.data?.message || "Failed to create brand",
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
          <PageHeading className="mb-3">New brand</PageHeading>
          <p className="text-muted-foreground text-sm mb-3">
            Establish a new brand identity in your catalog
          </p>
        </div>

        <Button
          size="lg"
          type="submit"
          form="brand-form"
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

      <BrandForm onSubmit={handleCreateBrand} />
    </div>
  );
}
