"use client";

import Link from "next/link";
import { ChevronRightIcon } from "lucide-react";

import { DynamicIcon } from "./DynamicIcon";
import { useAllStorefrontConfigurations } from "@/features/configurations/queries";
import { StorefrontConfigurationSection } from "@/features/configurations/enums";
import { type StorefrontCategoryChild } from "@/features/configurations/types";
import { cn } from "@/lib/utils";

interface Props {
  activeLabel?: string | null;
  onOpen?: (label: string, children: StorefrontCategoryChild[]) => void;
}

export function CategoryNavBar({ activeLabel, onOpen }: Props) {
  const { data: configurations } = useAllStorefrontConfigurations();

  const categoryItems =
    configurations?.[StorefrontConfigurationSection.CATEGORIES_PANEL]
      ?.filter((item) => item.enabled)
      .sort((a, b) => a.displayOrder - b.displayOrder) ?? [];

  return (
    <nav className="flex flex-col w-full h-full rounded-xl bg-card shadow-sm overflow-hidden">
      <div className="flex-1 overflow-y-auto py-1">
        {categoryItems.map((item) => {
          const isActive = activeLabel === item.categoryName;
          const label = item.categoryName ?? "";
          const hasChildren = (item.children?.length ?? 0) > 0;

          return (
            <div
              key={item.id}
              onMouseEnter={() => onOpen?.(label, item.children ?? [])}
            >
              <Link
                href={`/products?category=${encodeURIComponent(item.categorySlug ?? "")}`}
                className={cn(
                  "group flex w-full items-center gap-2 px-2.5 py-1.5 text-sm font-medium transition-all border-l-2",
                  isActive
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-transparent hover:border-primary/40 hover:bg-muted/60 text-foreground",
                )}
              >
                {item.icon ? (
                  <span
                    className={cn(
                      "flex size-5 shrink-0 items-center justify-center rounded transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary",
                    )}
                  >
                    <DynamicIcon name={item.icon} className="size-3" />
                  </span>
                ) : (
                  <span className="size-5 shrink-0" />
                )}
                <span className="flex-1 truncate">{label}</span>
                {hasChildren && (
                  <ChevronRightIcon
                    className={cn(
                      "size-3 shrink-0 transition-colors",
                      isActive ? "text-primary" : "text-muted-foreground/50",
                    )}
                  />
                )}
              </Link>
            </div>
          );
        })}
      </div>
    </nav>
  );
}
