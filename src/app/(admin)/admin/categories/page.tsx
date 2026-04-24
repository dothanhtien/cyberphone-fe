"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { PageHeading } from "@/components/PageHeading";
import { CategoriesTable } from "@/features/categories/components/CategoriesTable";
import { useDeleteCategory } from "@/features/categories/mutations";
import { useCategories } from "@/features/categories/queries";
import { usePageLayout, usePagination } from "@/hooks";

export default function CategoriesPage() {
  const router = useRouter();
  usePageLayout();

  const {
    pagination,
    setPagination,
    pageCount,
    updatePageCount,
    updatePagination,
  } = usePagination();

  const { data, isLoading, isError } = useCategories({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
  });

  useEffect(() => {
    if (isError) {
      toast.error("An error occurred when fetching categories");
    }

    if (data) {
      updatePagination(data.currentPage, data.itemsPerPage);
      updatePageCount(data.totalCount, data.itemsPerPage);
    }
  }, [data, isError, updatePagination, updatePageCount]);

  const deleteCategoryMutation = useDeleteCategory();

  const handleDeleteCategory = (id: string) => {
    deleteCategoryMutation.mutate(id, {
      onSuccess: () => toast.success("Category deleted successfully"),
      onError: () => toast.error("An error occurred when deleting category"),
    });
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <PageHeading>Categories</PageHeading>

        <Button size="lg" asChild>
          <Link href="/admin/categories/new">
            <Plus /> New category
          </Link>
        </Button>
      </div>

      <CategoriesTable
        data={data?.items ?? []}
        loading={isLoading}
        pagination={pagination}
        pageCount={pageCount}
        onPaginationChange={setPagination}
        onDelete={handleDeleteCategory}
        onRowClick={(category) =>
          router.push(`/admin/categories/${category.id}/edit`)
        }
      />
    </>
  );
}
