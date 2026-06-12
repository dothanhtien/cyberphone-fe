import { PaginationState } from "@tanstack/react-table";

import { ordersColumns } from "./OrdersColumns";
import { Order } from "../../types";
import { DataTable } from "@/components/data-table/DataTable";

interface OrdersTableProps {
  data: Order[];
  loading?: boolean;
  pagination: PaginationState;
  pageCount: number;
  onPaginationChange: (
    updater: PaginationState | ((old: PaginationState) => PaginationState),
  ) => void;
  onRowClick?: (order: Order) => void;
  hideCustomer?: boolean;
}

export function OrdersTable({
  data = [],
  loading,
  pagination,
  pageCount,
  onPaginationChange,
  onRowClick,
  hideCustomer,
}: OrdersTableProps) {
  const columns = hideCustomer
    ? ordersColumns.filter((col) => col.id !== "customer")
    : ordersColumns;

  return (
    <DataTable
      columns={columns}
      data={data}
      loading={loading}
      pageCount={pageCount}
      pagination={pagination}
      onPaginationChange={onPaginationChange}
      onRowClick={onRowClick}
    />
  );
}
