"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Eye, Trash } from "lucide-react";

import { Customer } from "../types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { formatDateTime } from "@/utils";

interface GetCustomersColumnsProps {
  onDelete?: (id: string) => void;
  onView?: (id: string) => void;
}

export const getCustomersColumns = ({
  onDelete,
  onView,
}: GetCustomersColumnsProps): ColumnDef<Customer>[] => {
  return [
    {
      id: "name",
      header: "Name",
      cell: ({ row }) => {
        const { firstName, lastName } = row.original;
        return (
          <span className="font-medium">
            {firstName} {lastName}
          </span>
        );
      },
    },
    {
      accessorKey: "email",
      header: "Email",
    },
    {
      accessorKey: "phone",
      header: "Phone",
      cell: ({ row }) =>
        row.original.phone ?? <span className="text-muted-foreground">—</span>,
    },
    {
      accessorKey: "gender",
      header: "Gender",
      cell: ({ row }) => {
        const gender = row.original.gender;
        if (!gender) return <span className="text-muted-foreground">—</span>;
        return <span className="capitalize">{gender}</span>;
      },
    },
    {
      accessorKey: "lastLogin",
      header: "Last Login",
      cell: ({ row }) => {
        const lastLogin = row.original.lastLogin;
        if (!lastLogin) return <span className="text-muted-foreground">—</span>;
        return formatDateTime(lastLogin);
      },
    },
    {
      accessorKey: "createdAt",
      header: "Created At",
      cell: ({ row }) => formatDateTime(row.original.createdAt),
    },
    {
      id: "status",
      header: () => <div className="text-center">Status</div>,
      cell: ({ row }) => {
        const isActive = row.original.isActive;
        return (
          <div className="flex justify-center">
            {isActive ? (
              <Badge className="bg-green-50 text-green-700">Active</Badge>
            ) : (
              <Badge className="bg-red-50 text-red-700">Inactive</Badge>
            )}
          </div>
        );
      },
    },
    {
      id: "actions",
      header: () => <div className="text-center">Actions</div>,
      cell: ({ row }) => {
        const id = row.original.id;
        return (
          <div
            className="flex items-center justify-center gap-1"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              variant="ghost"
              size="icon"
              className="size-8"
              onClick={(e) => {
                e.stopPropagation();
                onView?.(id);
              }}
            >
              <Eye className="h-4 w-4" />
            </Button>

            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-8 text-red-500"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </PopoverTrigger>

              <PopoverContent align="end" className="flex flex-col gap-2">
                <div>Are you sure you want to deactivate this customer?</div>
                <div className="flex justify-end gap-2">
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete?.(id);
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
};
