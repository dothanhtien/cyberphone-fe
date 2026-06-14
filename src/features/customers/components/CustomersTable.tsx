"use client";

import { useMemo } from "react";
import { PaginationState } from "@tanstack/react-table";

import { getCustomersColumns } from "./CustomersColumns";
import { Customer } from "../types";
import { DataTable } from "@/components/data-table/DataTable";

interface CustomersTableProps {
  data: Customer[];
  loading?: boolean;
  pagination: PaginationState;
  pageCount: number;
  onPaginationChange: (
    updater: PaginationState | ((old: PaginationState) => PaginationState),
  ) => void;
  onRowClick?: (customer: Customer) => void;
  onDelete?: (id: string) => void;
  onView?: (id: string) => void;
}

export function CustomersTable({
  data,
  loading,
  pagination,
  pageCount,
  onPaginationChange,
  onRowClick,
  onDelete,
  onView,
}: CustomersTableProps) {
  const columns = useMemo(
    () => getCustomersColumns({ onDelete, onView }),
    [onDelete, onView],
  );

  return (
    <DataTable
      columns={columns}
      data={data}
      loading={loading}
      pagination={pagination}
      pageCount={pageCount}
      onPaginationChange={onPaginationChange}
      onRowClick={onRowClick}
    />
  );
}
