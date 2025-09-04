"use client";

import { useCallback, useEffect, useState } from "react";

import PageHeading from "@/components/pageHeading";
import { DataTable } from "@/components/tables/dataTable";
import { Brand } from "@/app/interfaces";
import { apiService } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { columns } from "./brandsTable/column";
import { BrandModal } from "./brandModal";

export default function BrandsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [brandList, setBrandList] = useState<Brand[]>([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });
  const [pageCount, setPageCount] = useState(0);

  const [brandModalOpen, setBrandModalOpen] = useState(false);

  const fetchBrands = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await apiService.brands.getBrands({
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
      });

      if (data) {
        setBrandList(data.items);
        setPagination({
          pageIndex: data.currentPage - 1,
          pageSize: data.itemsPerPage,
        });
        setPageCount(Math.ceil(data.totalCount / data.itemsPerPage));
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

        <Button onClick={() => setBrandModalOpen(true)}>New brand</Button>
      </div>

      <DataTable
        columns={columns}
        data={brandList}
        isLoading={isLoading}
        pagination={pagination}
        onPaginationChange={setPagination}
        pageCount={pageCount}
      />

      <BrandModal
        open={brandModalOpen}
        onOpenChange={setBrandModalOpen}
        onSuccess={fetchBrands}
      />
    </>
  );
}
