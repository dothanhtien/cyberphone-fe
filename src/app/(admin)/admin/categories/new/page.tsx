"use client";

import { Loader2, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

import { Button } from "@/components/ui/button";
import { PageHeading } from "@/components/PageHeading";
import { CategoryForm } from "@/features/categories/components/CategoryForm";
import { useCreateCategory } from "@/features/categories/mutations";
import { CreateCategoryFormValues } from "@/features/categories/schemas";
import { CreateCategoryRequest } from "@/features/categories/types";
import { MediaRefType } from "@/features/media/enums";
import { useMedia } from "@/features/media/hooks/useMedia";
import { usePageLayout } from "@/hooks";
import { handleApiError } from "@/utils";
import { useCategories } from "@/features/categories/queries";
import { PageLoading } from "@/components/PageLoading";
import { ErrorCard } from "@/components/ErrorCard";

export default function NewCategoryPage() {
  const router = useRouter();
  const tempId = useMemo(() => uuidv4(), []);

  usePageLayout();

  const categoriesQuery = useCategories({ page: 1, limit: 1000 });

  const createMutation = useCreateCategory();

  const {
    mediaItems,
    isLoadingMediaItems,
    fetchMediaItems,
    uploadMediaItems,
    isUploadingMediaItems,
    deleteMediaItem,
    isDeletingMediaItem,
  } = useMedia({
    refType: MediaRefType.CATEGORY,
    refId: tempId,
    isTemporary: true,
  });

  const isLoading = categoriesQuery.isLoading;
  const categories = categoriesQuery.data?.items ?? [];

  const isCreating = createMutation.isPending;

  const handleCreateCategory = (data: Partial<CreateCategoryFormValues>) => {
    const dataToCreate: CreateCategoryRequest = {
      ...data,
      id: tempId,
      name: data.name!,
      slug: data.slug!,
    };

    createMutation.mutate(dataToCreate, {
      onSuccess: () => {
        toast.success("Category created successfully!");
        router.push("/admin/categories");
      },
      onError: (error) =>
        handleApiError(error, "An error occurred when creating category"),
    });
  };

  if (isLoading) {
    return <PageLoading />;
  }

  if (categoriesQuery.isError) {
    return (
      <ErrorCard title="An error occurred when fetching categories. Please try again." />
    );
  }

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
          disabled={isCreating}
          className="w-full sm:w-auto"
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

      <CategoryForm
        parentCategories={categories}
        onSubmit={handleCreateCategory}
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
