"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { PaginationState } from "@tanstack/react-table";

import PageHeading from "@/components/pageHeading";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/tables/dataTable";
import { getColumns } from "./components/categoriesTablecolumn";
import { Category } from "@/interfaces";
import { apiService } from "@/lib/api";

export default function CategoriesPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [pageCount, setPageCount] = useState(0);
  const router = useRouter();

  const fetchCategories = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await apiService.categories.getCategories({
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
      });

      if (data) {
        setCategoryList(data.items);
        const next = {
          pageIndex: data.currentPage - 1,
          pageSize: data.itemsPerPage,
        };
        setPagination((prev) =>
          prev.pageIndex !== next.pageIndex || prev.pageSize !== next.pageSize
            ? next
            : prev
        );
        setPageCount(
          Math.max(1, Math.ceil(data.totalCount / data.itemsPerPage))
        );
      }
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    } finally {
      setIsLoading(false);
    }
  }, [pagination.pageIndex, pagination.pageSize]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleEdit = (category: Category) => {
    router.push(`/admin/categories/${category.id}/edit`);
  };

  return (
    <>
      <div className="flex justify-between">
        <PageHeading>Categories</PageHeading>

        <Button onClick={() => router.push("/admin/categories/new")}>
          New category
        </Button>
      </div>

      <DataTable
        columns={useMemo(
          () =>
            getColumns({
              onEdit: handleEdit,
            }),
          [handleEdit]
        )}
        data={categoryList}
        isLoading={isLoading}
        pagination={pagination}
        onPaginationChange={setPagination}
        pageCount={pageCount}
      />
    </>
  );
}
