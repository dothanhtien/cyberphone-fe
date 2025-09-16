"use client";

import { useCallback, useEffect, useState } from "react";
import { PaginationState } from "@tanstack/react-table";
import { useRouter } from "next/navigation";

import PageHeading from "@/components/pageHeading";
import { DataTable } from "@/components/tables/dataTable";
import { getColumns } from "./components/productsTableColumn";
import { Button } from "@/components/ui/button";
import { Product } from "@/interfaces";
import { apiService } from "@/lib/api";

export default function ProductsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [productList, setProductList] = useState<Product[]>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [pageCount, setPageCount] = useState(0);
  const router = useRouter();

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await apiService.products.getProducts({
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
      });

      if (data) {
        setProductList(data.items);
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
      console.error("Failed to fetch products:", err);
    } finally {
      setIsLoading(false);
    }
  }, [pagination.pageIndex, pagination.pageSize]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <>
      <div className="flex justify-between">
        <PageHeading>Products</PageHeading>

        <Button onClick={() => router.push("/admin/products/new")}>
          New product
        </Button>
      </div>

      <DataTable
        columns={getColumns({})}
        data={productList}
        isLoading={isLoading}
        pagination={pagination}
        onPaginationChange={setPagination}
        pageCount={pageCount}
      />
    </>
  );
}
