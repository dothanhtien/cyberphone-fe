import { PaginationState } from "@tanstack/react-table";

import { brandsColumns } from "./BrandsColumns";
import { DataTable } from "@/components/data-table/DataTable";
import { Brand } from "@/features/brands/types";

export function BrandsTable({
  data = [],
  loading,
  pagination,
  pageCount,
  onPaginationChange,
}: {
  data: Brand[];
  loading?: boolean;
  pagination: PaginationState;
  pageCount: number;
  onPaginationChange: (
    updater: PaginationState | ((old: PaginationState) => PaginationState),
  ) => void;
}) {
  return (
    <DataTable
      columns={brandsColumns}
      data={data}
      loading={loading}
      pageCount={pageCount}
      pagination={pagination}
      onPaginationChange={onPaginationChange}
    />
  );
}
