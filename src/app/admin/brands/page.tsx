"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { PageHeading } from "@/components/pageHeading";
import { DataTable } from "@/components/tables/dataTable";
import { Button } from "@/components/ui/button";
import { getBrandsTableColumns } from "./components/brandsTable/columns";
import { Brand } from "@/interfaces";
import { apiService } from "@/lib/api";
import { useAppDispatch } from "@/lib/store/hooks";
import { setCurrentBrand } from "@/lib/store/features/brands/brandsSlice";
import { usePagination } from "@/hooks";

export default function BrandsPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [brandList, setBrandList] = useState<Brand[]>([]);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const {
    pagination,
    setPagination,
    pageCount,
    updatePageCount,
    updatePagination,
  } = usePagination();

  const fetchBrands = useCallback(async () => {
    setIsLoading(true);
    try {
      const { data } = await apiService.brands.getBrands({
        page: pagination.pageIndex + 1,
        limit: pagination.pageSize,
      });

      if (data) {
        setBrandList(data.items);
        updatePagination(data.currentPage, data.itemsPerPage);
        updatePageCount(data.totalCount, data.itemsPerPage);
      }
    } catch (err) {
      console.error("Failed to fetch brands:", err);
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
    fetchBrands();
  }, [fetchBrands]);

  const handleEditBrand = (brand: Brand) => {
    dispatch(setCurrentBrand(brand));
    router.push(`/admin/brands/${brand.id}/edit`);
  };

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
          onEdit: handleEditBrand,
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
