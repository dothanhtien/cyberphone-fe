"use client";

import { ColumnDef } from "@tanstack/react-table";

import { OrderItem } from "../../types";
import { formatCurrency } from "@/utils";

export const orderItemsColumns: ColumnDef<OrderItem>[] = [
  {
    id: "product",
    header: "Product",
    cell: ({ row }) => {
      const { variantName, sku, attributes } = row.original;
      const attrs = attributes.map((a) => a.displayValue || a.value).join(", ");

      return (
        <div className="space-y-0.5">
          <div className="text-sm font-medium">{variantName}</div>
          {attrs && (
            <div className="text-xs text-muted-foreground">{attrs}</div>
          )}
          <div className="text-xs text-muted-foreground">{sku}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "quantity",
    header: () => <div className="text-center">Qty</div>,
    cell: ({ cell }) => (
      <div className="text-center text-sm">{cell.getValue<number>()}</div>
    ),
  },
  {
    id: "price",
    header: () => <div className="text-right">Price</div>,
    cell: ({ row }) => {
      const unitPrice = parseFloat(row.original.unitPrice || "0");
      const salePrice = parseFloat(row.original.salePrice || "0");
      const hasDiscount = salePrice > 0 && salePrice < unitPrice;
      const effectivePrice = hasDiscount ? salePrice : unitPrice;

      return (
        <div className="text-right">
          {hasDiscount && (
            <div className="text-xs text-muted-foreground line-through">
              {formatCurrency(String(unitPrice))}{" "}
              <span className="not-line-through">VND</span>
            </div>
          )}
          <div className="text-sm font-medium">
            {formatCurrency(String(effectivePrice))}{" "}
            <span className="text-xs font-normal text-muted-foreground">VND</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "itemTotal",
    header: () => <div className="text-right">Subtotal</div>,
    cell: ({ cell }) => (
      <div className="text-right">
        <span className="text-sm font-semibold">
          {formatCurrency(cell.getValue<string>() ?? "0")}
        </span>
        <span className="ml-1 text-xs text-muted-foreground">VND</span>
      </div>
    ),
  },
];
