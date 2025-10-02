"use client";

import { useCallback, useEffect, useState } from "react";
import { PaginationState } from "@tanstack/react-table";

import PageHeading from "@/components/pageHeading";
import { DataTable } from "@/components/tables/dataTable";
import { getCategoriesColumns } from "./components/categoriesTable/columns";
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
