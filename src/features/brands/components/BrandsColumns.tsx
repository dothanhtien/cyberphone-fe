"use client";

import Image from "next/image";
import { ColumnDef } from "@tanstack/react-table";
import { SquarePen, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Brand } from "@/features/brands/types";
import { formatDateTime } from "@/utils";

export const brandsColumns: ColumnDef<Brand>[] = [
  {
    accessorKey: "logo",
    header: () => <div className="text-center">Logo</div>,
    cell: ({ row }) => {
      const src = row.getValue<string>("logo");
      const name = row.original.name;

      return (
        <div className="flex justify-center items-center">
          <Image
            src={src ?? "/images/default.png"}
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
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ cell }) => formatDateTime(cell.getValue<string>()),
  },
  {
    accessorKey: "updatedAt",
    header: "Updated At",
    cell: ({ cell }) => formatDateTime(cell.getValue<string>()),
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
