"use client";

import Link from "next/link";
import {
  ChevronRightIcon,
  SmartphoneIcon,
  TabletIcon,
  LaptopIcon,
  WatchIcon,
  HeadphonesIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";

export interface SubCategory {
  label: string;
  href: string;
}

export interface Category {
  label: string;
  href: string;
  icon: React.ReactNode;
  subCategories?: SubCategory[];
}

export const categories: Category[] = [
  {
    label: "Smartphones",
    href: "/products?category=smartphones",
    icon: <SmartphoneIcon className="size-4" />,
    subCategories: [
      { label: "iPhone", href: "/products?brand=apple" },
      { label: "Samsung", href: "/products?brand=samsung" },
      { label: "Xiaomi", href: "/products?brand=xiaomi" },
      { label: "OPPO", href: "/products?brand=oppo" },
    ],
  },
  {
    label: "Tablets",
    href: "/products?category=tablets",
    icon: <TabletIcon className="size-4" />,
    subCategories: [
      { label: "iPad", href: "/products?brand=apple&category=tablets" },
      { label: "Samsung Tab", href: "/products?brand=samsung&category=tablets" },
      { label: "Lenovo", href: "/products?brand=lenovo" },
    ],
  },
  {
    label: "Laptops",
    href: "/products?category=laptops",
    icon: <LaptopIcon className="size-4" />,
    subCategories: [
      { label: "MacBook", href: "/products?brand=apple&category=laptops" },
      { label: "Windows", href: "/products?category=laptops&os=windows" },
      { label: "Gaming", href: "/products?category=gaming-laptops" },
    ],
  },
  {
    label: "Smartwatches",
    href: "/products?category=smartwatches",
    icon: <WatchIcon className="size-4" />,
    subCategories: [
      { label: "Apple Watch", href: "/products?brand=apple&category=smartwatches" },
      { label: "Galaxy Watch", href: "/products?brand=samsung&category=smartwatches" },
      { label: "Garmin", href: "/products?brand=garmin" },
    ],
  },
  {
    label: "Accessories",
    href: "/products?category=accessories",
    icon: <HeadphonesIcon className="size-4" />,
    subCategories: [
      { label: "Cases & Covers", href: "/products?category=cases" },
      { label: "Chargers & Cables", href: "/products?category=chargers" },
      { label: "Earphones", href: "/products?category=earphones" },
      { label: "Power Banks", href: "/products?category=power-banks" },
    ],
  },
];

interface Props {
  activeLabel: string | null;
  onOpen: (label: string) => void;
  onClose: () => void;
}

export function CategoryNavBar({ activeLabel, onOpen, onClose }: Props) {
  return (
    <nav className="flex flex-col w-full h-full rounded-lg border border-border bg-background p-2">
      <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Categories
      </p>
      {categories.map((category) => {
        const isActive = activeLabel === category.label;
        const hasSubs = !!category.subCategories?.length;

        return (
          <div
            key={category.label}
            onMouseEnter={() => onOpen(category.label)}
            onMouseLeave={onClose}
          >
            <Link
              href={category.href}
              className={cn(
                "flex w-full items-center gap-2.5 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                isActive ? "bg-muted text-foreground" : "hover:bg-muted text-foreground"
              )}
            >
              <span className="text-muted-foreground">{category.icon}</span>
              <span className="flex-1">{category.label}</span>
              {hasSubs && (
                <ChevronRightIcon className="size-4 text-muted-foreground" />
              )}
            </Link>
          </div>
        );
      })}
    </nav>
  );
}
