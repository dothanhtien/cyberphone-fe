"use client";

import { SquarePen, Trash } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Brand } from "@/app/interfaces";

export const columns: ColumnDef<Brand>[] = [
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
      return (
        <img src={src} alt="Logo" className="h-6 w-6 object-contain rounded" />
      );
    },
  },
  {
    accessorKey: "action",
    header: () => <div className="text-center">Action</div>,
    cell: () => {
      return (
        <div className="text-center">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="default"
                size="icon"
                className="size-8 mr-2 cursor-pointer"
              >
                <SquarePen />
              </Button>
            </TooltipTrigger>
            <TooltipContent>It is getting the implemetation</TooltipContent>
          </Tooltip>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="destructive"
                size="icon"
                className="size-8 cursor-pointer"
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
