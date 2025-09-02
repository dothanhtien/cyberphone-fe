"use client";

import { SquarePen, Trash } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";

import { User } from "@/app/interfaces";
import { formatRelative } from "@/app/utils";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "fullName",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "role",
    header: "Role",
  },
  {
    accessorKey: "lastLogin",
    header: "Last login",
    cell: ({ row }) => {
      return <>{formatRelative(row.getValue("lastLogin")) || "Never"}</>;
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
