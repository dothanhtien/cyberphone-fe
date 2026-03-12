"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
  CircleDot,
  Clock,
  CheckCircle2,
  Package,
  Truck,
  XCircle,
  LucideProps,
} from "lucide-react";

import { RecentOrder } from "../types";
import { formatCurrency } from "@/utils/currency";
import { OrderStatus } from "@/enums";
import { Badge } from "@/components/ui/badge";

const STATUS_CONFIG: Record<
  OrderStatus,
  {
    label: string;
    className: string;
    Icon: React.ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
    >;
  }
> = {
  [OrderStatus.PENDING]: {
    label: "Pending",
    className:
      "bg-yellow-50 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300",
    Icon: Clock,
  },

  [OrderStatus.CONFIRMED]: {
    label: "Confirmed",
    className: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
    Icon: CheckCircle2,
  },

  [OrderStatus.PROCESSING]: {
    label: "Processing",
    className:
      "bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
    Icon: Package,
  },

  [OrderStatus.SHIPPING]: {
    label: "Shipping",
    className: "bg-cyan-50 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300",
    Icon: Truck,
  },

  [OrderStatus.COMPLETED]: {
    label: "Completed",
    className:
      "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300",
    Icon: CheckCircle2,
  },

  [OrderStatus.CANCELLED]: {
    label: "Cancelled",
    className: "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300",
    Icon: XCircle,
  },
};

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

      const config = STATUS_CONFIG[status] ?? {
        label: status,
        className: "",
        Icon: CircleDot,
      };

      const Icon = config.Icon;

      return (
        <div className="flex justify-center">
          <Badge
            variant="outline"
            className={`flex w-fit items-center gap-1.5 px-2 py-0.5 text-xs font-medium ${config.className}`}
          >
            <Icon className="h-3.5 w-3.5" />
            {config.label}
          </Badge>
        </div>
      );
    },
  },
];
