"use client";

import { SquarePen, Trash } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Brand } from "@/app/interfaces";

interface GetColumnsProps {
  onEdit: (brand: Brand) => void;
  onDelete: (brand: Brand) => void;
}

export const getColumns = ({
  onEdit,
  onDelete,
}: GetColumnsProps): ColumnDef<Brand>[] => [
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
    cell: ({ row }) => {
      return (
        <div className="text-center">
          <Button
            variant="default"
            size="icon"
            className="size-8 mr-2 cursor-pointer"
            onClick={() => onEdit(row.original)}
          >
            <SquarePen />
          </Button>

          <Button
            variant="destructive"
            size="icon"
            className="size-8 cursor-pointer"
            onClick={() => onDelete(row.original)}
          >
            <Trash />
          </Button>
        </div>
      );
    },
  },
];
