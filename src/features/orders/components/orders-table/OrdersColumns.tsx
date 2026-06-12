"use client";

import { Eye } from "lucide-react";
import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";

import { OrderStatusBadge } from "../OrderStatusBadge";
import { PaymentStatusBadge } from "../PaymentStatusBadge";
import { Order } from "../../types";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
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
    header: "Order",
    cell: ({ row }) => (
      <div className="text-sm font-medium text-muted-foreground">
        {row.original.code}
      </div>
    ),
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
        <div className="flex items-center gap-2.5">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="text-xs">
              {avatarFallback}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">{displayName}</span>
        </div>
      );
    },
  },
  {
    id: "date",
    header: "Date",
    cell: ({ row }) => (
      <span className="text-sm text-muted-foreground">
        {formatDateTime(row.original.updatedAt || row.original.createdAt)}
      </span>
    ),
  },
  {
    accessorKey: "orderStatus",
    header: () => <div className="text-center">Order Status</div>,
    cell: ({ cell }) => (
      <div className="flex justify-center">
        <OrderStatusBadge status={cell.getValue<OrderStatus>()} />
      </div>
    ),
  },
  {
    accessorKey: "paymentStatus",
    header: () => <div className="text-center">Payment</div>,
    cell: ({ cell }) => (
      <div className="flex justify-center">
        <PaymentStatusBadge status={cell.getValue<PaymentStatus>()} />
      </div>
    ),
  },
  {
    accessorKey: "orderTotal",
    header: () => <div className="text-right">Total</div>,
    cell: ({ cell }) => (
      <div className="text-right">
        <span className="text-sm font-semibold">
          {formatCurrency(cell.getValue<string>())}
        </span>
        <span className="ml-1 text-xs text-muted-foreground">VND</span>
      </div>
    ),
  },
  {
    id: "actions",
    header: "",
    cell: ({ row }) => (
      <div className="flex justify-end">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8 text-muted-foreground hover:text-foreground"
          asChild
          onClick={(e) => e.stopPropagation()}
        >
          <Link href={`/admin/orders/${row.original.id}`}>
            <Eye className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    ),
  },
];
