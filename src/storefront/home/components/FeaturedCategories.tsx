"use client";

import Link from "next/link";

import { DynamicIcon } from "./DynamicIcon";
import { StorefrontConfigurationSection } from "@/features/configurations/enums";
import { useAllStorefrontConfigurations } from "@/features/configurations/queries";

export function FeaturedCategories() {
  const { data: configurations } = useAllStorefrontConfigurations();

  const categoryItems =
    configurations?.[StorefrontConfigurationSection.CATEGORIES_PANEL]
      ?.filter((item) => item.enabled)
      .sort((a, b) => a.displayOrder - b.displayOrder)
      .slice(0, 10) ?? [];

  if (categoryItems.length === 0) return null;

  return (
    <div className="mt-6 flex gap-3 overflow-x-auto pb-1 scrollbar-none">
      {categoryItems.map((item) => (
        <Link
          key={item.id}
          href={`/products?category=${encodeURIComponent(item.categorySlug ?? "")}`}
          className="flex shrink-0 flex-col items-center gap-2 rounded-xl border border-border bg-card px-4 py-3 text-xs font-medium transition-colors hover:bg-muted hover:border-primary/40 min-w-18"
        >
          {item.icon && (
            <span className="text-primary">
              <DynamicIcon name={item.icon} className="size-5" />
            </span>
          )}
          <span className="text-center leading-tight line-clamp-2">
            {item.categoryName}
          </span>
        </Link>
      ))}
    </div>
  );
}
