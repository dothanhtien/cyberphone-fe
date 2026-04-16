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
}

export function OrdersTable({
  data = [],
  loading,
  pagination,
  pageCount,
  onPaginationChange,
  onRowClick,
}: OrdersTableProps) {
  return (
    <DataTable
      columns={ordersColumns}
      data={data}
      loading={loading}
      pageCount={pageCount}
      pagination={pagination}
      onPaginationChange={onPaginationChange}
      onRowClick={onRowClick}
    />
  );
}
