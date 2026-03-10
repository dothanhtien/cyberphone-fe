"use client";

import { ColumnDef } from "@tanstack/react-table";

export interface RecentOrder {
  orderCode: string;
  customer: string;
  amount: number;
  status: string;
}

export const recentOrdersColumns: ColumnDef<RecentOrder>[] = [
  {
    accessorKey: "orderCode",
    header: "Order code",
  },
  {
    accessorKey: "customer",
    header: "Customer",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "status",
    header: "Status",
  },
];
