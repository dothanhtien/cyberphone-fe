"use client";

import * as React from "react";
import Link from "next/link";

import { type StorefrontCategoryChild } from "@/features/configurations/types";
import { CategoryNavBar } from "./CategoryNavBar";

export function HeroSection({ slider }: { slider: React.ReactNode }) {
  const [activeLabel, setActiveLabel] = React.useState<string | null>(null);
  const [activeChildren, setActiveChildren] = React.useState<StorefrontCategoryChild[]>([]);

  function handleOpen(label: string, children: StorefrontCategoryChild[]) {
    setActiveLabel(label);
    setActiveChildren(children);
  }

  function handleClose() {
    setActiveLabel(null);
    setActiveChildren([]);
  }

  return (
    <div className="relative mt-2 grid grid-cols-8 gap-3" onMouseLeave={handleClose}>
      <div className="hidden lg:flex lg:col-span-2">
        <CategoryNavBar activeLabel={activeLabel} onOpen={handleOpen} />
      </div>

      <div className="col-span-8 lg:col-span-6">{slider}</div>

      {activeLabel && activeChildren.length > 0 && (
        <div className="absolute inset-0 hidden lg:grid lg:grid-cols-8 lg:gap-3 pointer-events-none z-50">
          <div className="col-span-2" />
          <div className="col-span-6 pointer-events-auto rounded-lg border border-border bg-popover p-4 shadow-md">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {activeLabel}
            </p>
            <div className="flex flex-col gap-1">
              {activeChildren.map((child) => (
                <Link
                  key={child.id}
                  href={`/products?category=${encodeURIComponent(child.slug)}`}
                  className="flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors hover:bg-muted text-foreground"
                >
                  {child.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
