"use client";

import { Loader2 } from "lucide-react";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  PaginationState,
  useReactTable,
} from "@tanstack/react-table";

import { DataTablePagination } from "./DataTablePagination";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  loading?: boolean;
  pagination?: PaginationState;
  pageCount?: number;
  onPaginationChange?: (
    updater: PaginationState | ((old: PaginationState) => PaginationState),
  ) => void;
  onRowClick?: (row: TData) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  loading = false,
  pagination,
  pageCount,
  onPaginationChange,
  onRowClick,
}: DataTableProps<TData, TValue>) {
  const hasPagination = !!pagination && !!onPaginationChange;

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    state: hasPagination ? { pagination } : undefined,
    manualPagination: hasPagination,
    pageCount: hasPagination ? pageCount : undefined,
    onPaginationChange: hasPagination ? onPaginationChange : undefined,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: hasPagination ? getPaginationRowModel() : undefined,
  });

  return (
    <div>
      <div className="overflow-hidden border bg-white rounded-xl">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  <div className="flex items-center justify-center space-x-2">
                    <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                    <span>Loading…</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className={
                    onRowClick ? "cursor-pointer hover:bg-muted/50" : ""
                  }
                  onClick={() => onRowClick?.(row.original)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {hasPagination && <DataTablePagination table={table} />}
    </div>
  );
}
