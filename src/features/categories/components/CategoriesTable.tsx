import { PaginationState } from "@tanstack/react-table";

import { DataTable } from "@/components/data-table/DataTable";
import { categoriesColumns } from "./CategoriesColumns";
import { Category } from "@/features/categories/types";

export function CategoriesTable({
  data = [],
  loading,
  pagination,
  pageCount,
  onPaginationChange,
}: {
  data: Category[];
  loading?: boolean;
  pagination: PaginationState;
  pageCount: number;
  onPaginationChange: (
    updater: PaginationState | ((old: PaginationState) => PaginationState),
  ) => void;
}) {
  return (
    <DataTable
      columns={categoriesColumns}
      data={data}
      loading={loading}
      pageCount={pageCount}
      pagination={pagination}
      onPaginationChange={onPaginationChange}
    />
  );
}
