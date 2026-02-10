"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { PageHeading } from "@/components/PageHeading";
import { usePagination } from "@/hooks";
import { useBrands } from "@/features/brands/queries";
import { BrandsTable } from "./components/BrandsTable";

export default function BrandsPage() {
  const {
    pagination,
    setPagination,
    pageCount,
    updatePageCount,
    updatePagination,
  } = usePagination();

  const { data, isLoading, isError } = useBrands({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
  });

  useEffect(() => {
    if (isError) {
      toast.error("An error occurred when fetching brands", {
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
        <PageHeading>Brands</PageHeading>

        <Button size="lg" asChild>
          <Link href="/admin/brands">
            <Plus /> New brand
          </Link>
        </Button>
      </div>

      <BrandsTable
        data={data?.items ?? []}
        loading={isLoading}
        pagination={pagination}
        pageCount={pageCount}
        onPaginationChange={setPagination}
      />
    </>
  );
}
