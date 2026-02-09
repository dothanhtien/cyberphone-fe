"use client";

import { useRouter } from "next/navigation";
import { AxiosError } from "axios";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { PageHeading } from "@/components/PageHeading";
import { CategoryForm } from "../components/CategoryForm";
import { CreateCategoryFormValues } from "@/features/categories/schemas";
import { useCreateCategory } from "@/features/categories/mutations";
import { ApiError } from "@/types";

export default function NewCategoryPage() {
  const router = useRouter();
  const createMutation = useCreateCategory();
  const isSubmitting = createMutation.isPending;

  const handleCreateCategory = (data: CreateCategoryFormValues) => {
    createMutation.mutate(data, {
      onSuccess: () => {
        toast.success("Category created successfully!", {
          position: "top-right",
        });
        router.push("/admin/categories");
      },
      onError: (error) => {
        const axiosError = error as AxiosError<ApiError>;
        console.error("Create category failed:", error);
        toast.error(
          axiosError.response?.data?.message || "Failed to create category",
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
          <PageHeading className="mb-3">New category</PageHeading>
          <p className="text-muted-foreground text-sm mb-3">
            Add a new segment to your product hierarchy
          </p>
        </div>

        <Button
          size="lg"
          type="submit"
          form="category-form"
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
              Save change
            </>
          )}
        </Button>
      </div>

      <CategoryForm onSubmit={handleCreateCategory} />
    </div>
  );
}
