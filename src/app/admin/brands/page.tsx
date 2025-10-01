"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PaginationState } from "@tanstack/react-table";

import PageHeading from "@/components/pageHeading";
import { DataTable } from "@/components/tables/dataTable";
import { Button } from "@/components/ui/button";
import { getBrandsTableColumns } from "./components/brandsTable/columns";
import { Brand } from "@/interfaces";
import { apiService } from "@/lib/api";

export default function BrandsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [brandList, setBrandList] = useState<Brand[]>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [pageCount, setPageCount] = useState(0);
  const router = useRouter();

  const fetchBrands = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await apiService.brands.getBrands({
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
      });

      if (data) {
        setBrandList(data.items);
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
      console.error("Failed to fetch brands:", err);
    } finally {
      setIsLoading(false);
    }
  }, [pagination.pageIndex, pagination.pageSize]);

  useEffect(() => {
    fetchBrands();
  }, [fetchBrands]);

  return (
    <>
      <div className="flex justify-between">
        <PageHeading>Brands</PageHeading>

        <Button onClick={() => router.push("/admin/brands/new")}>
          New brand
        </Button>
      </div>

      <DataTable
        columns={getBrandsTableColumns({
          onEdit: () => {},
          onDelete: () => {},
        })}
        data={brandList}
        isLoading={isLoading}
        pagination={pagination}
        onPaginationChange={setPagination}
        pageCount={pageCount}
      />
    </>
  );
}
