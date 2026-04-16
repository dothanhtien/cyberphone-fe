"use client";

import { ColumnDef } from "@tanstack/react-table";

import { RecentOrder } from "../types";
import { OrderStatus } from "@/enums";
import { formatCurrency } from "@/utils";
import { OrderStatusBadge } from "@/features/orders/components/OrderStatusBadge";

export const recentOrdersColumns: ColumnDef<RecentOrder>[] = [
  {
    accessorKey: "code",
    header: "Order #",
    cell: ({ cell }) => (
      <div className="py-1 font-medium">{cell.getValue<string>()}</div>
    ),
  },

  {
    accessorKey: "totalAmount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ cell }) => (
      <div className="text-right font-medium">
        {formatCurrency(cell.getValue<number>())}
        <span className="ml-1">VND</span>
      </div>
    ),
  },

  {
    accessorKey: "orderStatus",
    header: () => <div className="text-center">Status</div>,
    cell: ({ cell }) => {
      const status = cell.getValue<OrderStatus>();

      return <OrderStatusBadge status={status} />;
    },
  },
];
