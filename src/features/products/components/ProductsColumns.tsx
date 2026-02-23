"use client";

import Image from "next/image";
import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import {
  CheckCircle2,
  CircleDot,
  Ellipsis,
  FileEdit,
  PauseCircle,
  Settings,
  SquarePen,
  Trash,
  XCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ProductImageType, ProductStatus } from "../enums";
import { Product } from "@/features/products/types";

export const productsColumns: ColumnDef<Product>[] = [
  {
    id: "imageNameSlug",
    header: () => <div className="text-center">Product</div>,
    cell: ({ row }) => {
      const productImages = row.original.images ?? [];
      const mainImage = productImages.find(
        (img) => img.imageType === ProductImageType.MAIN,
      );
      const name = row.original.name;
      const slug = row.original.slug;

      return (
        <div className="flex justify-start items-center gap-4 px-4">
          <Image
            src={mainImage?.url ?? "/images/default.png"}
            alt={name}
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
    cell: ({ row }) => {
      const brand = row.original.brand;
      return <>{brand.name}</>;
    },
  },
  {
    id: "categories",
    header: "Categories",
    cell: ({ row }) => {
      const categories = row.original.categories;
      return (
        <div className="flex flex-col w-full flex-wrap justify-start gap-1">
          {categories.map((cat) => (
            <Badge key={cat.id} variant="secondary">
              {cat.name}
            </Badge>
          ))}
        </div>
      );
    },
  },
  {
    id: "variants",
    header: "Variants",
    cell: () => <>No variants</>,
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ cell }) => {
      const status = cell.getValue<ProductStatus>();

      let className: string | undefined;
      let variant:
        | "link"
        | "secondary"
        | "default"
        | "destructive"
        | "outline"
        | "ghost"
        | null
        | undefined = "secondary";

      let Icon = CircleDot;

      switch (status) {
        case ProductStatus.DRAFT:
          variant = "secondary";
          Icon = FileEdit;
          break;

        case ProductStatus.ACTIVE:
          variant = undefined;
          className =
            "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300";
          Icon = CheckCircle2;
          break;

        case ProductStatus.INACTIVE:
          variant = undefined;
          className =
            "bg-yellow-50 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300";
          Icon = PauseCircle;
          break;

        case ProductStatus.DISCONTINUED:
          variant = undefined;
          className =
            "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300";
          Icon = XCircle;
          break;

        default:
          variant = "secondary";
          Icon = CircleDot;
      }

      return (
        <Badge variant={variant} className={className ?? ""}>
          <Icon className="mr-1 h-3.5 w-3.5" />
          {status.toUpperCase()}
        </Badge>
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
          <div className="flex flex-col w-full flex-wrap justify-start gap-1">
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
    header: "Actions",
    cell: ({ row }) => {
      const productId = row.original.id;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="size-8">
              <Ellipsis />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="min-w-40">
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <SquarePen /> Edit product
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Trash /> Delete product
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/admin/products/${productId}/variants`}>
                  <Settings /> Manage variants
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
