import { PaginationState } from "@tanstack/react-table";

import { DataTable } from "@/components/data-table/DataTable";
import { getProductsColumns } from "./ProductsColumns";
import { Product } from "../types";

export function ProductsTable({
  data = [],
  loading,
  pageCount,
  pagination,
  onDelete,
  onPaginationChange,
  onRowClick,
}: {
  data: Product[];
  loading?: boolean;
  pageCount: number;
  pagination: PaginationState;
  onDelete?: (id: string) => void;
  onPaginationChange: (
    updater: PaginationState | ((old: PaginationState) => PaginationState),
  ) => void;
  onRowClick?: (brand: Product) => void;
}) {
  return (
    <DataTable
      columns={getProductsColumns({ onDelete })}
      data={data}
      loading={loading}
      pageCount={pageCount}
      pagination={pagination}
      onPaginationChange={onPaginationChange}
      onRowClick={onRowClick}
    />
  );
}
