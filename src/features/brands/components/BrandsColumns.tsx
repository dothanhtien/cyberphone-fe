"use client";

import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";
import { Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Brand } from "@/features/brands/types";
import { DEFAULT_IMAGE } from "@/constants";
import { cn } from "@/lib/utils";

interface GetBrandsColumnsProps {
  onDelete?: (id: string) => void;
}

export const getBrandsColumns = ({
  onDelete,
}: GetBrandsColumnsProps): ColumnDef<Brand>[] => [
  {
    accessorKey: "logo",
    header: () => <div className="text-center">Logo</div>,
    cell: ({ row }) => {
      const src = row.getValue<string>("logo");
      const name = row.original.name;

      return (
        <div className="flex justify-center items-center">
          <Image
            src={src ?? DEFAULT_IMAGE}
            alt={`${name} logo`}
            loading="eager"
            width={64}
            height={64}
            className="object-contain rounded min-h-16"
            referrerPolicy="no-referrer"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "slug",
    header: "Slug",
  },
  {
    accessorKey: "productCount",
    header: () => <div className="text-center">Products</div>,
    cell: ({ row }) => (
      <div className="text-center">{row.original.productCount}</div>
    ),
  },
  {
    id: "actions",
    header: () => <div className="text-center">Actions</div>,
    cell: ({ row }) => {
      const canDelete = !row.original.productCount;

      return (
        <div className="text-center" onClick={(e) => e.stopPropagation()}>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className={cn("size-8", canDelete ? "text-red-500" : "")}
                onClick={(e) => e.stopPropagation()}
                disabled={!canDelete}
              >
                <Trash />
              </Button>
            </PopoverTrigger>

            <PopoverContent align="end" className="flex flex-col gap-2">
              <div>Are you sure you want to delete this brand?</div>
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
