"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

import { PageHeading } from "@/components/PageHeading";
import { CustomersTable } from "@/features/customers/components/CustomersTable";
import { useCustomers } from "@/features/customers/queries";
import { useDeleteCustomer } from "@/features/customers/mutations";
import { usePageLayout, usePagination } from "@/hooks";

export default function CustomersPage() {
  const router = useRouter();

  usePageLayout();

  const {
    pagination,
    setPagination,
    pageCount,
    updatePageCount,
    updatePagination,
  } = usePagination();

  const { data, isLoading, isError } = useCustomers({
    page: pagination.pageIndex + 1,
    limit: pagination.pageSize,
  });

  const deleteCustomerMutation = useDeleteCustomer();

  const handleDelete = (id: string) => {
    deleteCustomerMutation.mutate(id, {
      onSuccess: () => toast.success("Customer deactivated successfully"),
      onError: () =>
        toast.error("An error occurred when deactivating customer"),
    });
  };

  useEffect(() => {
    if (data) {
      updatePagination(data.currentPage, data.itemsPerPage);
      updatePageCount(data.totalCount, data.itemsPerPage);
    }
  }, [data, updatePagination, updatePageCount]);

  useEffect(() => {
    if (isError) {
      toast.error("An error occurred when fetching customers");
    }
  }, [isError]);

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <PageHeading>Customers</PageHeading>
      </div>

      <CustomersTable
        data={data?.items ?? []}
        loading={isLoading}
        pagination={pagination}
        pageCount={pageCount}
        onPaginationChange={setPagination}
        onRowClick={(customer) =>
          router.push(`/admin/customers/${customer.id}`)
        }
        onView={(id) => router.push(`/admin/customers/${id}`)}
        onDelete={handleDelete}
      />
    </>
  );
}
