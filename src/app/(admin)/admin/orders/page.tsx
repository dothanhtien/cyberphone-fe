"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

import { PageHeading } from "@/components/PageHeading";
import { OrdersTable } from "@/features/orders/components/orders-table/OrdersTable";
import { useOrders } from "@/features/orders/queries";
import { usePageLayout, usePagination } from "@/hooks";

export default function OrdersPage() {
  const router = useRouter();

  usePageLayout();

  const {
    pagination,
    setPagination,
    pageCount,
    updatePageCount,
    updatePagination,
  } = usePagination();

  const { data, isLoading, isError } = useOrders({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
  });

  useEffect(() => {
    if (isError) {
      toast.error("An error occurred when fetching orders");
    }

    if (data) {
      updatePagination(data.currentPage, data.itemsPerPage);
      updatePageCount(data.totalCount, data.itemsPerPage);
    }
  }, [data, isError, updatePagination, updatePageCount]);

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <PageHeading>Orders</PageHeading>
      </div>

      <OrdersTable
        data={data?.items ?? []}
        loading={isLoading}
        pagination={pagination}
        pageCount={pageCount}
        onPaginationChange={setPagination}
        onRowClick={(order) => router.push(`/admin/orders/${order.id}`)}
      />
    </>
  );
}
