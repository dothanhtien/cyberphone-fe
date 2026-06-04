"use client";

import { useParams } from "next/navigation";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";

import { ErrorCard } from "@/components/ErrorCard";
import { PageHeading } from "@/components/PageHeading";
import { PageLoading } from "@/components/PageLoading";
import { Button } from "@/components/ui/button";
import { CategoryForm } from "@/features/categories/components/CategoryForm";
import { MediaRefType } from "@/features/media/enums";
import { useUpdateCategory } from "@/features/categories/mutations";
import {
  useCategories,
  useCategoryDetails,
} from "@/features/categories/queries";
import { useMedia } from "@/features/media/hooks/useMedia";
import { CreateCategoryFormValues } from "@/features/categories/schemas";
import { usePageLayout } from "@/hooks";
import { handleApiError } from "@/utils";

export default function EditCategoryPage() {
  const { id: categoryId } = useParams<{ id: string }>();

  const categoriesQuery = useCategories({ page: 1, limit: 1000 });
  const categoryQuery = useCategoryDetails(categoryId);

  const category = categoryQuery.data;

  usePageLayout({ segmentLabel: category?.name });

  const updateCategoryMutation = useUpdateCategory();

  const {
    mediaItems,
    isLoadingMediaItems,
    fetchMediaItems,
    uploadMediaItems,
    isUploadingMediaItems,
    deleteMediaItem,
    isDeletingMediaItem,
  } = useMedia({ refType: MediaRefType.CATEGORY, refId: categoryId });

  const isLoading = categoriesQuery.isLoading || categoryQuery.isLoading;
  const parentCategories = (categoriesQuery.data?.items ?? []).filter(
    (c) => c.id !== categoryId,
  );

  const isUpdating = updateCategoryMutation.isPending;

  const handleUpdateCategory = (data: Partial<CreateCategoryFormValues>) => {
    updateCategoryMutation.mutate(
      { id: categoryId, data },
      {
        onSuccess: () => toast.success("Category updated successfully"),
        onError: (error) =>
          handleApiError(error, "An error occurred when updating category"),
      },
    );
  };

  if (isLoading) {
    return <PageLoading />;
  }

  if (categoriesQuery.isError || categoryQuery.isError) {
    return (
      <ErrorCard title="Parent categories or category not found. Please try again." />
    );
  }

  return (
    <div className="max-w-230">
      <div className="flex flex-col gap-4 mb-4 md:flex-row md:justify-between md:items-start">
        <div>
          <PageHeading className="mb-3">Edit category</PageHeading>
          <p className="text-muted-foreground text-sm mb-3">
            Update the category information in your catalog
          </p>
        </div>

        <Button
          size="lg"
          type="submit"
          form="category-form"
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

      <CategoryForm
        category={category}
        parentCategories={parentCategories}
        onSubmit={handleUpdateCategory}
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
