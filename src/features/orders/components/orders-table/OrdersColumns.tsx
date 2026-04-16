"use client";

import { ColumnDef } from "@tanstack/react-table";

import { OrderStatusBadge } from "../OrderStatusBadge";
import { PaymentStatusBadge } from "../PaymentStatusBadge";
import { Order } from "../../types";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { OrderStatus, PaymentStatus } from "@/enums";
import {
  formatCurrency,
  formatDateTime,
  getAvatarFallback,
  getDisplayName,
} from "@/utils";

export const ordersColumns: ColumnDef<Order>[] = [
  {
    accessorKey: "code",
    header: "Order ID",
    cell: ({ row }) => {
      return <div className="font-semibold">{row.original.code}</div>;
    },
  },
  {
    id: "customer",
    header: "Customer",
    cell: ({ row }) => {
      const displayName = getDisplayName({
        firstName: row.original.customer?.firstName,
        lastName: row.original.customer?.lastName,
      });
      const avatarFallback = getAvatarFallback(displayName);

      return (
        <div className="flex items-center gap-2">
          <Avatar>
            <AvatarFallback>{avatarFallback}</AvatarFallback>
          </Avatar>
          <div>{displayName}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "orderTotal",
    header: () => <div className="text-right">Total</div>,
    cell: ({ cell }) => (
      <div className="text-right font-medium text-red-500">
        {formatCurrency(cell.getValue<string>())}
        <span className="ml-1">VND</span>
      </div>
    ),
  },
  {
    accessorKey: "orderStatus",
    header: () => <div className="text-center">Order status</div>,
    cell: ({ cell }) => {
      const status = cell.getValue<OrderStatus>();

      return <OrderStatusBadge status={status} />;
    },
  },
  {
    accessorKey: "paymentStatus",
    header: () => <div className="text-center">Payment status</div>,
    cell: ({ cell }) => {
      const status = cell.getValue<PaymentStatus>();

      return <PaymentStatusBadge status={status} />;
    },
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ cell }) => formatDateTime(cell.getValue<string>()),
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
    cell: ({ cell }) => formatDateTime(cell.getValue<string>()),
  },
];
