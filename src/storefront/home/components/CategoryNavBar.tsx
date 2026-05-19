"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { type LucideProps, ChevronRightIcon } from "lucide-react";
import dynamicIconImports from "lucide-react/dynamicIconImports";

import { useAllStorefrontConfigurations } from "@/features/configurations/queries";
import { StorefrontConfigurationSection } from "@/features/configurations/enums";
import { type StorefrontCategoryChild } from "@/features/configurations/types";
import { cn } from "@/lib/utils";

function DynamicIcon({ name, ...props }: { name: string } & LucideProps) {
  const [Icon, setIcon] = useState<React.ComponentType<LucideProps> | null>(null);

  useEffect(() => {
    const importFn = dynamicIconImports[name as keyof typeof dynamicIconImports];
    if (!importFn) return;
    importFn().then((mod) => setIcon(() => mod.default as React.ComponentType<LucideProps>));
  }, [name]);

  if (!Icon) return null;
  return <Icon {...props} />;
}

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
    <nav className="flex flex-col w-full h-full rounded-lg border border-border bg-background p-2">
      <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
        Categories
      </p>
      {categoryItems.map((item) => {
        const isActive = activeLabel === item.categoryName;
        const label = item.categoryName ?? "";
        const hasChildren = item.children && item.children.length > 0;

        return (
          <div
            key={item.id}
            onMouseEnter={() => onOpen?.(label, item.children ?? [])}
          >
            <Link
              href={`/products?category=${item.categorySlug ?? ""}`}
              className={cn(
                "flex w-full items-center gap-2.5 px-3 py-2 text-sm font-medium rounded-md transition-colors",
                isActive
                  ? "bg-muted text-foreground"
                  : "hover:bg-muted text-foreground",
              )}
            >
              {item.icon && (
                <span className="text-muted-foreground">
                  <DynamicIcon name={item.icon} className="size-4" />
                </span>
              )}
              <span className="flex-1">{label}</span>
              {hasChildren && <ChevronRightIcon className="size-4 text-muted-foreground" />}
            </Link>
          </div>
        );
      })}
    </nav>
  );
}
