"use client";

import { ColumnDef } from "@tanstack/react-table";

import { OrderItem } from "../../types";
import { formatCurrency } from "@/utils";

export const orderItemsColumns: ColumnDef<OrderItem>[] = [
  {
    id: "product",
    header: "Product",
    cell: ({ row }) => {
      return (
        <div>
          <div className="font-semibold">{row.original.variantName}</div>
          <div className="text-xs text-muted-foreground">
            {row.original.attributes
              .map((a) => a.displayValue || a.value)
              .join(", ")}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "sku",
    header: "SKU",
  },
  {
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "unitPrice",
    header: () => <div className="text-right">Unit price</div>,
    cell: ({ cell }) => (
      <div className="text-right font-medium">
        {formatCurrency(cell.getValue<number>())}
        <span className="ml-1">VND</span>
      </div>
    ),
  },
  {
    accessorKey: "salePrice",
    header: () => <div className="text-right">Sale price</div>,
    cell: ({ cell }) => (
      <div className="text-right font-medium">
        {cell.getValue<number>()
          ? formatCurrency(cell.getValue<number>())
          : "0"}
        <span className="ml-1">VND</span>
      </div>
    ),
  },
  {
    accessorKey: "itemTotal",
    header: () => <div className="text-right">Subtotal</div>,
    cell: ({ cell }) => (
      <div className="text-right font-medium">
        {cell.getValue<number>()
          ? formatCurrency(cell.getValue<number>())
          : "0"}
        <span className="ml-1">VND</span>
      </div>
    ),
  },
];
