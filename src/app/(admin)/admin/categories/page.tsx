"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import { CategoriesTable } from "@/features/categories/components/CategoriesTable";
import { Button } from "@/components/ui/button";
import { PageHeading } from "@/components/PageHeading";
import { usePagination } from "@/hooks";
import { useCategories } from "@/features/categories/queries";

export default function CategoriesPage() {
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
      toast.error("An error occurred when fetching categories", {
        position: "top-right",
      });
    }

    if (data) {
      updatePagination(data.currentPage, data.itemsPerPage);
      updatePageCount(data.totalCount, data.itemsPerPage);
    }
  }, [data, isError, updatePagination, updatePageCount]);

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
      />
    </>
  );
}
