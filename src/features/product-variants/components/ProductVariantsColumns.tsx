"use client";

import { Star, Trash } from "lucide-react";
import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";

import { PRODUCT_VARIANT_STOCK_STATUS } from "../constants";
import { ProductVariantStockStatus } from "../enums";
import { ProductVariantListItem } from "../types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { formatCurrency } from "@/utils";
import { DEFAULT_IMAGE } from "@/constants";

const STOCK_STATUS_STYLES = {
  [ProductVariantStockStatus.IN_STOCK]: "bg-green-100 text-green-700",
  [ProductVariantStockStatus.LOW_STOCK]: "bg-yellow-100 text-yellow-700",
  [ProductVariantStockStatus.OUT_OF_STOCK]: "bg-zinc-200 text-zinc-700",
};

interface GetProductVariantColumnsProps {
  onDelete: (id: string) => void;
}

export function getProductVariantsColumns({
  onDelete,
}: GetProductVariantColumnsProps): ColumnDef<ProductVariantListItem>[] {
  return [
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
              src={variant.mainImageUrl ?? DEFAULT_IMAGE}
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
      header: () => <div className="text-center">Actions</div>,
      cell: ({ row }) => {
        return (
          <div className="text-center" onClick={(e) => e.stopPropagation()}>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8 text-red-500"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Trash />
                </Button>
              </PopoverTrigger>

              <PopoverContent align="end" className="flex flex-col gap-2">
                <div>Are you sure you want to delete this variant?</div>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete?.(row.original.id);
                    }}
                  >
                    Confirm
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        );
      },
    },
  ];
}
