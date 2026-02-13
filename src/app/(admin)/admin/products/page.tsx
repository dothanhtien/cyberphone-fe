"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { PageHeading } from "@/components/PageHeading";
import { usePagination } from "@/hooks";
import { useProducts } from "@/features/products/queries";
import { ProductsTable } from "@/features/products/components/ProductsTable";

export default function ProductsPage() {
  const {
    pagination,
    setPagination,
    pageCount,
    updatePageCount,
    updatePagination,
  } = usePagination();

  const { data, isLoading, isError } = useProducts({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
  });

  useEffect(() => {
    if (isError) {
      toast.error("An error occurred when fetching products", {
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
        <PageHeading>Products</PageHeading>

        <Button size="lg" asChild>
          <Link href="/admin/products/new">
            <Plus /> New products
          </Link>
        </Button>
      </div>

      <ProductsTable
        data={data?.items ?? []}
        loading={isLoading}
        pagination={pagination}
        pageCount={pageCount}
        onPaginationChange={setPagination}
      />
    </>
  );
}
