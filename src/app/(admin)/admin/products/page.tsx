"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { PageHeading } from "@/components/PageHeading";
import { usePagination } from "@/hooks";
import { useProducts } from "@/features/products/queries";
import { ProductsTable } from "@/features/products/components/ProductsTable";
import { useDeleteProduct } from "@/features/products/mutations";

export default function ProductsPage() {
  const router = useRouter();

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

  const deleteProductMutation = useDeleteProduct();

  const handleDeleteProduct = (id: string) => {
    deleteProductMutation.mutate(id, {
      onSuccess: () => toast.success("Product deleted successfully"),
      onError: () => toast.error("An error occurred when deleting product"),
    });
  };

  useEffect(() => {
    if (data) {
      updatePagination(data.currentPage, data.itemsPerPage);
      updatePageCount(data.totalCount, data.itemsPerPage);
    }
  }, [data, updatePagination, updatePageCount]);

  if (isError) {
    toast.error("An error occurred when fetching products");
  }

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
        onRowClick={(product) =>
          router.push(`/admin/products/${product.id}/edit`)
        }
        onDelete={handleDeleteProduct}
      />
    </>
  );
}
