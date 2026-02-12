import { PaginationState } from "@tanstack/react-table";

import { DataTable } from "@/components/data-table/DataTable";
import { productsColumns } from "./ProductsColumns";
import { Product } from "../types";

export function ProductsTable({
  data = [],
  loading,
  pagination,
  pageCount,
  onPaginationChange,
}: {
  data: Product[];
  loading?: boolean;
  pagination: PaginationState;
  pageCount: number;
  onPaginationChange: (
    updater: PaginationState | ((old: PaginationState) => PaginationState),
  ) => void;
}) {
  return (
    <DataTable
      columns={productsColumns}
      data={data}
      loading={loading}
      pageCount={pageCount}
      pagination={pagination}
      onPaginationChange={onPaginationChange}
    />
  );
}
