"use client";

import Link from "next/link";
import { useState } from "react";

import { CategoryNavBar } from "./CategoryNavBar";
import { type StorefrontCategoryChild } from "@/features/configurations/types";

export function HeroSection({ slider }: { slider: React.ReactNode }) {
  const [activeLabel, setActiveLabel] = useState<string | null>(null);
  const [activeChildren, setActiveChildren] = useState<
    StorefrontCategoryChild[]
  >([]);

  function handleOpen(label: string, children: StorefrontCategoryChild[]) {
    setActiveLabel(label);
    setActiveChildren(children);
  }

  function handleClose() {
    setActiveLabel(null);
    setActiveChildren([]);
  }

  return (
    <div
      className="relative mt-2 grid grid-cols-8 gap-3"
      onMouseLeave={handleClose}
    >
      <div className="hidden lg:flex lg:col-span-2">
        <CategoryNavBar activeLabel={activeLabel} onOpen={handleOpen} />
      </div>

      <div className="col-span-8 lg:col-span-6">{slider}</div>

      {activeLabel && activeChildren.length > 0 && (
        <div className="absolute inset-0 hidden lg:grid lg:grid-cols-8 lg:gap-3 pointer-events-none z-50">
          <div className="col-span-2" />
          <div className="col-span-6 pointer-events-auto rounded-xl bg-card shadow-lg border border-border overflow-hidden">
            <div className="p-2 grid grid-cols-2 gap-0.5">
              {activeChildren.map((child) => (
                <Link
                  key={child.id}
                  href={`/products?category=${encodeURIComponent(child.slug)}`}
                  className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg transition-colors hover:bg-muted text-foreground"
                >
                  <span className="size-1.5 rounded-full bg-primary/40 shrink-0" />
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
