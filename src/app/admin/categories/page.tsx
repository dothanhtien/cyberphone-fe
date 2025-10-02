"use client";

import { useCallback, useEffect, useState } from "react";

import PageHeading from "@/components/pageHeading";
import { DataTable } from "@/components/tables/dataTable";
import { getCategoriesColumns } from "./components/categoriesTable/columns";
import { Category } from "@/interfaces";
import { apiService } from "@/lib/api";
import { usePagination } from "@/hooks/usePagination";

export default function CategoriesPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const {
    pagination,
    setPagination,
    pageCount,
    updatePageCount,
    updatePagination,
  } = usePagination();

  const fetchCategories = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await apiService.categories.getCategories({
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
      });

      if (data) {
        setCategoryList(data.items);
        updatePagination(data.currentPage, data.itemsPerPage);
        updatePageCount(data.totalCount, data.itemsPerPage);
      }
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    } finally {
      setIsLoading(false);
    }
  }, [
    pagination.pageIndex,
    pagination.pageSize,
    updatePageCount,
    updatePagination,
  ]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <>
      <PageHeading>Categories</PageHeading>

      <DataTable
        columns={getCategoriesColumns({
          onEdit: () => {},
          onDelete: () => {},
        })}
        data={categoryList}
        isLoading={isLoading}
        pagination={pagination}
        onPaginationChange={setPagination}
        pageCount={pageCount}
      />
    </>
  );
}
