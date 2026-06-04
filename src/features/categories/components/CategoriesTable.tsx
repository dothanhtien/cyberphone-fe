import { PaginationState } from "@tanstack/react-table";

import { getCategoriesColumns } from "./CategoriesColumns";
import { DataTable } from "@/components/data-table/DataTable";
import { Category } from "@/features/categories/types";

interface CategoriesTableProps {
  data: Category[];
  loading?: boolean;
  pagination: PaginationState;
  pageCount: number;
  onPaginationChange: (
    updater: PaginationState | ((old: PaginationState) => PaginationState),
  ) => void;
  onDelete?: (id: string) => void;
  onRowClick?: (category: Category) => void;
}

export function CategoriesTable({
  data = [],
  loading,
  pagination,
  pageCount,
  onPaginationChange,
  onDelete,
  onRowClick,
}: CategoriesTableProps) {
  return (
    <DataTable
      columns={getCategoriesColumns({ onDelete })}
      data={data}
      loading={loading}
      pageCount={pageCount}
      pagination={pagination}
      onPaginationChange={onPaginationChange}
      onRowClick={onRowClick}
    />
  );
}
