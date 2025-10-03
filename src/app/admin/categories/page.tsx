"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { PageHeading } from "@/components/pageHeading";
import { DataTable } from "@/components/tables/dataTable";
import { getCategoriesColumns } from "./components/categoriesTable/columns";
import { Category } from "@/interfaces";
import { apiService } from "@/lib/api";
import { usePagination } from "@/hooks";
import { useAppDispatch } from "@/lib/store/hooks";
import { setCurrentCategory } from "@/lib/store/features/categories/categoriesSlice";

export default function CategoriesPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [categoryList, setCategoryList] = useState<Category[]>([]);
  const router = useRouter();
  const dispatch = useAppDispatch();
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

  const handleEditCategories = (category: Category) => {
    dispatch(setCurrentCategory(category));
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
        columns={getCategoriesColumns({
          onEdit: handleEditCategories,
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
