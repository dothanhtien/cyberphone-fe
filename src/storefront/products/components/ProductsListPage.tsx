"use client";

import { useState } from "react";
import { useDebouncedCallback } from "@/hooks";
import { Search, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";

import { ProductItem } from "./ProductItem";
import { useStorefrontProductList } from "../queries";
import { StorefrontProductsParams } from "../types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { StorefrontConfigurationSection } from "@/features/configurations/enums";
import { useAllStorefrontConfigurations } from "@/features/configurations/queries";
import { cn } from "@/lib/utils";

export const PAGE_SIZE = 20;

const SORT_OPTIONS = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" },
];

function ProductGridSkeleton() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
      {Array.from({ length: PAGE_SIZE }).map((_, i) => (
        <div
          key={i}
          className="rounded-xl border border-border overflow-hidden"
        >
          <Skeleton className="aspect-square w-full" />
          <div className="p-3 space-y-2">
            <Skeleton className="h-3 w-full rounded" />
            <Skeleton className="h-3 w-3/4 rounded" />
            <Skeleton className="h-5 w-1/2 rounded mt-2" />
            <Skeleton className="h-8 w-full rounded mt-2" />
          </div>
        </div>
      ))}
    </div>
  );
}

function Pagination({
  page,
  total,
  limit,
  onPageChange,
}: {
  page: number;
  total: number;
  limit: number;
  onPageChange: (p: number) => void;
}) {
  const pageCount = Math.max(1, Math.ceil(total / limit));
  if (pageCount <= 1) return null;

  const pages: (number | "...")[] = [];
  for (let i = 1; i <= pageCount; i++) {
    if (i === 1 || i === pageCount || (i >= page - 2 && i <= page + 2)) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "...") {
      pages.push("...");
    }
  }

  return (
    <div className="flex items-center justify-center gap-1 mt-8 flex-wrap">
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
      >
        Previous
      </Button>
      {pages.map((p, i) =>
        p === "..." ? (
          <span
            key={`dots-${i}`}
            className="px-2 text-muted-foreground select-none"
          >
            …
          </span>
        ) : (
          <Button
            key={p}
            variant={p === page ? "default" : "outline"}
            size="sm"
            onClick={() => onPageChange(p as number)}
          >
            {p}
          </Button>
        ),
      )}
      <Button
        variant="outline"
        size="sm"
        onClick={() => onPageChange(page + 1)}
        disabled={page >= pageCount}
      >
        Next
      </Button>
    </div>
  );
}

export function ProductsListPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const category = searchParams.get("category") ?? undefined;
  const brand = searchParams.get("brand") ?? undefined;
  const sort = searchParams.get("sort") ?? undefined;
  const _parsedPage = parseInt(searchParams.get("page") ?? "", 10);
  const page =
    Number.isInteger(_parsedPage) && _parsedPage >= 1 ? _parsedPage : 1;
  const search = searchParams.get("search") ?? undefined;

  const [localSearch, setLocalSearch] = useState(search ?? "");
  const [syncedSearch, setSyncedSearch] = useState(search);

  if (syncedSearch !== search) {
    setSyncedSearch(search);
    setLocalSearch(search ?? "");
  }

  const { data: configurations } = useAllStorefrontConfigurations();
  const categoryItems =
    configurations?.[StorefrontConfigurationSection.CATEGORIES_PANEL]
      ?.filter((item) => item.enabled && item.categorySlug)
      .sort((a, b) => a.displayOrder - b.displayOrder) ?? [];

  const params: StorefrontProductsParams = {
    page,
    limit: PAGE_SIZE,
    search,
    category,
    brand,
    sort,
  };

  const { data, isLoading, isError, isFetching } =
    useStorefrontProductList(params);

  const buildUrl = (updates: Record<string, string | number | undefined>) => {
    const next = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(updates)) {
      if (value !== undefined && value !== "") {
        next.set(key, String(value));
      } else {
        next.delete(key);
      }
    }
    return `/products?${next.toString()}`;
  };

  const navigate = (
    updates: Record<string, string | number | undefined>,
    resetPage = true,
  ) => {
    router.push(
      buildUrl(
        resetPage && !("page" in updates)
          ? { ...updates, page: undefined }
          : updates,
      ),
    );
  };

  const handleSearchChange = useDebouncedCallback((value: string) => {
    navigate({ search: value || undefined });
  }, 500);

  const hasActiveFilters = !!(search || category || brand || sort);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Search products</h1>
        {data && (
          <p className="text-sm text-muted-foreground mt-1">
            {data.totalCount.toLocaleString()} product
            {data.totalCount !== 1 ? "s" : ""} found
          </p>
        )}
      </div>

      <div className="flex flex-col gap-3 mb-6">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
            <Input
              className="pl-8 pr-8"
              placeholder="Search products..."
              value={localSearch}
              onChange={(e) => {
                setLocalSearch(e.target.value);
                handleSearchChange(e.target.value);
              }}
            />
            {localSearch && (
              <button
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                onClick={() => {
                  setLocalSearch("");
                  navigate({ search: undefined });
                }}
                aria-label="Clear search"
              >
                <X className="size-4" />
              </button>
            )}
          </div>

          <Select
            value={sort ?? "__default__"}
            onValueChange={(val) =>
              navigate({ sort: val === "__default__" ? undefined : val })
            }
          >
            <SelectTrigger className="w-44 shrink-0">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="__default__">Default</SelectItem>
              {SORT_OPTIONS.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {categoryItems.length > 0 && (
          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
            <button
              onClick={() => navigate({ category: undefined })}
              className={cn(
                "shrink-0 rounded-full px-3 py-1 text-xs font-medium border transition-colors",
                !category
                  ? "bg-primary text-primary-foreground border-primary"
                  : "border-border bg-card text-foreground hover:border-primary/40 hover:bg-muted/60",
              )}
            >
              All
            </button>
            {categoryItems.map((item) => (
              <button
                key={item.id}
                onClick={() =>
                  navigate({ category: item.categorySlug ?? undefined })
                }
                className={cn(
                  "shrink-0 rounded-full px-3 py-1 text-xs font-medium border transition-colors",
                  category === item.categorySlug
                    ? "bg-primary text-primary-foreground border-primary"
                    : "border-border bg-card text-foreground hover:border-primary/40 hover:bg-muted/60",
                )}
              >
                {item.categoryName}
              </button>
            ))}
          </div>
        )}
      </div>

      {isLoading ? (
        <ProductGridSkeleton />
      ) : isError ? (
        <p className="py-16 text-center text-muted-foreground">
          Failed to load products. Please try again.
        </p>
      ) : data?.items.length === 0 ? (
        <div className="py-16 text-center">
          <p className="text-muted-foreground">No products found.</p>
          {hasActiveFilters && (
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => router.push("/products")}
            >
              Clear filters
            </Button>
          )}
        </div>
      ) : (
        <div className={cn("transition-opacity", isFetching && "opacity-60")}>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {data?.items.map((product) => (
              <ProductItem key={product.id} product={product} />
            ))}
          </div>
          <Pagination
            page={page}
            total={data?.totalCount ?? 0}
            limit={PAGE_SIZE}
            onPageChange={(p) => navigate({ page: p }, false)}
          />
        </div>
      )}
    </div>
  );
}
