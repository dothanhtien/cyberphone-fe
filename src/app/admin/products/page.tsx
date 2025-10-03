"use client";

import { useCallback, useEffect, useState } from "react";

import { PageHeading } from "@/components/pageHeading";
import { DataTable } from "@/components/tables/dataTable";
import { getProductsTableColumns } from "./components/productsTable/columns";
import { usePagination } from "@/hooks";
import { Product } from "@/interfaces";
import { apiService } from "@/lib/api";

export default function ProductsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [productList, setProductList] = useState<Product[]>([]);
  const {
    pagination,
    setPagination,
    pageCount,
    updatePageCount,
    updatePagination,
  } = usePagination();

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await apiService.products.getProducts({
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
      });

      if (data) {
        setProductList(data.items);
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
    fetchProducts();
  }, [fetchProducts]);

  return (
    <>
      <PageHeading>Products</PageHeading>

      <DataTable
        columns={getProductsTableColumns({
          onEdit: () => {},
          onDelete: () => {},
        })}
        data={productList}
        isLoading={isLoading}
        pagination={pagination}
        onPaginationChange={setPagination}
        pageCount={pageCount}
      />
    </>
  );
}
