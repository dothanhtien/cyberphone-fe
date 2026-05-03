"use client";

import * as React from "react";
import Link from "next/link";

import { CategoryNavBar, categories } from "./CategoryNavBar";

export function HeroSection({ slider }: { slider: React.ReactNode }) {
  const [activeLabel, setActiveLabel] = React.useState<string | null>(null);
  const closeTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const open = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveLabel(label);
  };

  const scheduleClose = () => {
    closeTimer.current = setTimeout(() => setActiveLabel(null), 80);
  };

  const activeCategory = categories.find((c) => c.label === activeLabel);

  return (
    <div className="relative mt-2 grid grid-cols-8 gap-3">
      <div className="hidden lg:block lg:col-span-2">
        <CategoryNavBar
          activeLabel={activeLabel}
          onOpen={open}
          onClose={scheduleClose}
        />
      </div>

      <div className="col-span-8 lg:col-span-6">{slider}</div>

      {activeCategory?.subCategories?.length ? (
        <div className="absolute inset-0 hidden lg:grid lg:grid-cols-8 lg:gap-3 pointer-events-none z-50">
          <div className="col-span-2" />
          <div
            className="col-span-6 pointer-events-auto rounded-lg border border-l-0 border-border bg-popover p-4"
            onMouseEnter={() => open(activeCategory.label)}
            onMouseLeave={scheduleClose}
          >
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              {activeCategory.label}
            </p>
            <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {activeCategory.subCategories.map((sub) => (
                <li key={sub.href}>
                  <Link
                    href={sub.href}
                    className="flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium hover:bg-muted transition-colors"
                  >
                    {sub.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </div>
  );
}
