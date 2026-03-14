"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { PageHeading } from "@/components/PageHeading";
import { BrandsTable } from "@/features/brands/components/BrandsTable";
import { useBrands } from "@/features/brands/queries";
import { useDeleteBrand } from "@/features/brands/mutations";
import { usePagination } from "@/hooks";

export default function BrandsPage() {
  const router = useRouter();

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
      toast.error("An error occurred when fetching brands");
    }

    if (data) {
      updatePagination(data.currentPage, data.itemsPerPage);
      updatePageCount(data.totalCount, data.itemsPerPage);
    }
  }, [data, isError, updatePagination, updatePageCount]);

  const deleteBrandMutation = useDeleteBrand();

  const handleDeleteBrand = (id: string) => {
    deleteBrandMutation.mutate(id, {
      onSuccess: () => toast.success("Brand deleted successfully"),
      onError: () => toast.error("An error occurred when deleting brand"),
    });
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <PageHeading>Brands</PageHeading>

        <Button size="lg" asChild>
          <Link href="/admin/brands/new">
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
        onDelete={handleDeleteBrand}
        onRowClick={(brand) => router.push(`/admin/brands/${brand.id}/edit`)}
      />
    </>
  );
}
