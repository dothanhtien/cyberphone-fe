"use client";

import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";
import { Ellipsis, SquarePen, Star, Trash } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PRODUCT_VARIANT_STOCK_STATUS } from "../constants";
import { ProductVariantStockStatus } from "../enums";
import { ProductVariant } from "../types";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("vi-VN").format(value);

const STOCK_STATUS_STYLES = {
  [ProductVariantStockStatus.IN_STOCK]: "bg-green-100 text-green-700",
  [ProductVariantStockStatus.LOW_STOCK]: "bg-yellow-100 text-yellow-700",
  [ProductVariantStockStatus.OUT_OF_STOCK]: "bg-zinc-200 text-zinc-700",
};

export const productVariantsColumns: ColumnDef<ProductVariant>[] = [
  {
    id: "isDefault",
    header: () => <div className="text-center">Default</div>,
    cell: ({ row }) => {
      const isDefault = row.original.isDefault;
      return (
        <div className="flex justify-center">
          <Star
            size={16}
            className={
              isDefault
                ? "text-yellow-400 fill-yellow-400"
                : "text-muted-foreground"
            }
          />
        </div>
      );
    },
  },
  {
    id: "variantDetails",
    header: "Variant",
    cell: ({ row }) => {
      const variant = row.original;
      return (
        <div className="flex items-center gap-4">
          <Image
            src={"/images/default.png"}
            className="rounded bg-muted object-contain"
            width={64}
            height={64}
            alt={variant.name}
          />
          <div>
            <div className="font-medium">{variant.name}</div>
            <div className="text-sm text-muted-foreground">{variant.sku}</div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => <>{formatCurrency(row.original.price)} VND</>,
  },
  {
    accessorKey: "stockQuantity",
    header: "Stock quantity",
  },
  {
    accessorKey: "stockStatus",
    header: "Stock status",
    cell: ({ row }) => {
      const stockStatus = row.original.stockStatus;

      return (
        <Badge className={STOCK_STATUS_STYLES[stockStatus]}>
          {PRODUCT_VARIANT_STOCK_STATUS[stockStatus]}
        </Badge>
      );
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: () => {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="size-8">
              <Ellipsis />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-40">
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <SquarePen /> Edit
              </DropdownMenuItem>

              <DropdownMenuItem>
                <Star /> Set as default
              </DropdownMenuItem>

              <DropdownMenuItem>
                <Trash /> Delete
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
