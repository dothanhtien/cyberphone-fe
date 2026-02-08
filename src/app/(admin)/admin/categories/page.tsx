"use client";

import { useCallback, useEffect, useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { CategoriesTable } from "./components/CategoriesTable";
import { usePagination } from "@/hooks";
import { categoriesApi } from "@/services";
import { Category } from "@/types";

export default function CategoriesPage() {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const {
    pagination,
    setPagination,
    pageCount,
    updatePageCount,
    updatePagination,
  } = usePagination();

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    try {
      const response = await categoriesApi.getAll({
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
      });

      setCategories(response.items);
      updatePagination(response.currentPage, response.itemsPerPage);
      updatePageCount(response.totalCount, response.itemsPerPage);
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    } finally {
      setLoading(false);
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Categories</h1>
        <Button size="lg">
          <Plus /> Create category
        </Button>
      </div>

      <CategoriesTable
        data={categories}
        loading={loading}
        pagination={pagination}
        pageCount={pageCount}
        onPaginationChange={setPagination}
      />
    </>
  );
}
