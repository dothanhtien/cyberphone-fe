"use client";

import Image from "next/image";
import { SquarePen, Trash } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Category } from "@/interfaces";

interface GetColumnsProps {
  onEdit: (category: Category) => void;
  onDelete: (category: Category) => void;
}

export const getCategoriesColumns = ({
  onEdit,
  onDelete,
}: GetColumnsProps): ColumnDef<Category>[] => [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "slug",
    header: "Slug",
  },
  {
    accessorKey: "logoUrl",
    header: "Logo",
    cell: ({ row }) => {
      const src = row.getValue<string>("logoUrl");
      const name = row.original.name;
      if (!src) {
        return (
          <div className="h-6 w-6 rounded bg-muted text-xs grid place-items-center">
            -
          </div>
        );
      }
      return (
        <Image
          src={src}
          alt={`${name} logo`}
          loading="lazy"
          width={24}
          height={24}
          className="h-6 w-6 object-contain rounded"
          referrerPolicy="no-referrer"
        />
      );
    },
  },
  {
    accessorKey: "action",
    header: () => <div className="text-center">Action</div>,
    cell: ({ row }) => {
      return (
        <div className="text-center">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={null}
                size="icon"
                className="size-8 mr-2"
                onClick={() => onEdit(row.original)}
              >
                <SquarePen />
              </Button>
            </TooltipTrigger>
            <TooltipContent>It is getting the implemetation</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={null}
                size="icon"
                className="size-8 text-red-500"
                onClick={() => onDelete(row.original)}
              >
                <Trash />
              </Button>
            </TooltipTrigger>
            <TooltipContent>It is getting the implemetation</TooltipContent>
          </Tooltip>
        </div>
      );
    },
  },
];
