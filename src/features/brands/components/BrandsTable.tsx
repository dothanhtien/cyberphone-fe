import { PaginationState } from "@tanstack/react-table";

import { getBrandsColumns } from "./BrandsColumns";
import { DataTable } from "@/components/data-table/DataTable";
import { Brand } from "@/features/brands/types";

interface BrandsTableProps {
  data: Brand[];
  loading?: boolean;
  pagination: PaginationState;
  pageCount: number;
  onPaginationChange: (
    updater: PaginationState | ((old: PaginationState) => PaginationState),
  ) => void;
  onDelete?: (id: string) => void;
  onRowClick?: (brand: Brand) => void;
}

export function BrandsTable({
  data = [],
  loading,
  pagination,
  pageCount,
  onPaginationChange,
  onDelete,
  onRowClick,
}: BrandsTableProps) {
  return (
    <DataTable
      columns={getBrandsColumns({ onDelete })}
      data={data}
      loading={loading}
      pageCount={pageCount}
      pagination={pagination}
      onPaginationChange={onPaginationChange}
      onRowClick={onRowClick}
    />
  );
}
