"use client";

import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";
import { CircleDot, SquarePen, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/features/products/types";

export const productsColumns: ColumnDef<Product>[] = [
  {
    id: "imageNameSlug",
    header: () => <div className="pl-2">Product</div>,
    cell: ({ row }) => {
      const src = undefined; // TODO: replace with main image
      const name = row.original.name;
      const slug = row.original.slug;

      return (
        <div className="flex justify-start items-center">
          <Image
            src={src ?? "/images/default.png"}
            alt={`${name} logo`}
            loading="eager"
            width={64}
            height={64}
            className="object-contain rounded"
            referrerPolicy="no-referrer"
          />

          <div>
            <div className="font-bold">{name}</div>
            <div className="text-sm text-muted-foreground">{slug}</div>
          </div>
        </div>
      );
    },
  },
  {
    id: "brand",
    header: "Brand",
    cell: () => <>Apple</>,
  },
  {
    id: "categories",
    header: "Categories",
    cell: () => {
      return (
        <div className="flex flex-col w-full flex-wrap justify-start gap-1">
          <Badge variant="secondary">SmartPhone</Badge>
          <Badge variant="secondary">+ 2 more</Badge>
        </div>
      );
    },
  },
  {
    id: "variants",
    header: "Variants",
    cell: () => <>3 variants</>,
  },
  {
    accessorKey: "status",
    header: () => <div className="text-center">Status</div>,
    cell: ({ cell }) => {
      return (
        // TODO: change Badge color based on status
        <div className="text-center">
          <Badge className="bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300">
            <CircleDot /> {cell.getValue<string>().toUpperCase()}
          </Badge>
        </div>
      );
    },
  },
  {
    id: "flags",
    header: "Flags",
    cell: ({ row }) => {
      const isFeatured = row.original.isFeatured;
      const isBestseller = row.original.isBestseller;

      if (isFeatured || isBestseller) {
        return (
          <div className="flex w-full flex-wrap justify-start gap-1">
            {isFeatured && (
              <Badge className="bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
                Featured
              </Badge>
            )}

            {isBestseller && (
              <Badge className="bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300">
                Best Seller
              </Badge>
            )}
          </div>
        );
      } else {
        return <div className="text-muted-foreground">No flags</div>;
      }
    },
  },
  {
    id: "actions",
    header: () => <div className="text-center">Actions</div>,
    cell: () => {
      return (
        <div className="text-center">
          <Button variant="ghost" size="icon" className="size-8">
            <SquarePen />
          </Button>

          <Button variant="ghost" size="icon" className="size-8 text-red-500">
            <Trash />
          </Button>
        </div>
      );
    },
  },
];
