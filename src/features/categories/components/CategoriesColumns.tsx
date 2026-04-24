"use client";

import { Trash } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { DEFAULT_IMAGE } from "@/constants";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Category } from "@/features/categories/types";

interface GetCategoriesColumnsProps {
  onDelete?: (id: string) => void;
}

function DeleteCell({
  category,
  onDelete,
}: {
  category: Category;
  onDelete?: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const canDelete = !category.productCount;

  return (
    <div className="text-center" onClick={(e) => e.stopPropagation()}>
      <Popover open={open} onOpenChange={setOpen}>
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
          <div>Are you sure you want to delete this category?</div>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onDelete?.(category.id);
                setOpen(false);
              }}
            >
              Confirm
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export const getCategoriesColumns = ({
  onDelete,
}: GetCategoriesColumnsProps): ColumnDef<Category>[] => [
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
            className="object-contain rounded"
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
    cell: ({ row }) => (
      <DeleteCell category={row.original} onDelete={onDelete} />
    ),
  },
];
