"use client";

import { useEffect } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { CategoriesTable } from "./components/CategoriesTable";
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
        <h1 className="text-2xl font-bold">Categories</h1>
        <Button size="lg">
          <Plus /> Create category
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
