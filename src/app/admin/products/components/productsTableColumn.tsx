"use client";

import { SquarePen, Trash } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Product } from "@/interfaces";

interface GetColumnsProps {
  onEdit: (products: Product) => void;
  // onDelete: (products: Product) => void;
}

export const getColumns = ({
  onEdit,
}: GetColumnsProps): ColumnDef<Product>[] => [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "slug",
    header: "Slug",
  },
  {
    accessorKey: "action",
    header: () => <div className="text-center">Action</div>,
    cell: ({ row }) => {
      return (
        <div className="text-center">
          <Button
            variant={null}
            size="icon"
            className="size-8 mr-2 cursor-pointer"
            onClick={() => onEdit(row.original)}
          >
            <SquarePen />
          </Button>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant={null}
                size="icon"
                className="size-8 cursor-pointer text-red-500"
                // onClick={() => onDelete(row.original)}
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
