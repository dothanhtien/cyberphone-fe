"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { PageHeading } from "@/components/pageHeading";
import { DataTable } from "@/components/tables/dataTable";
import { getProductsTableColumns } from "./components/productsTable/columns";
import { usePagination } from "@/hooks";
import { Product } from "@/interfaces";
import { apiService } from "@/lib/api";
import { useAppDispatch } from "@/lib/store/hooks";
import { setCurrentProduct } from "@/lib/store/features/products/productsSlice";

export default function ProductsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [productList, setProductList] = useState<Product[]>([]);
  const router = useRouter();
  const dispatch = useAppDispatch();
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

  const handleEditProduct = (product: Product) => {
    dispatch(setCurrentProduct(product));
    router.push(`/admin/products/${product.id}/edit`);
  };

  return (
    <>
      <div className="flex justify-between">
        <PageHeading>Products</PageHeading>

        <Button onClick={() => router.push("/admin/products/new")}>
          New product
        </Button>
      </div>

      <DataTable
        columns={getProductsTableColumns({
          onEdit: handleEditProduct,
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
