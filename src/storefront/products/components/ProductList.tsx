"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";

import { ProductItem } from "./ProductItem";
import { slugToKey } from "../graphql";
import { useStorefrontProducts } from "../queries";
import { StorefrontProduct } from "../types";
import { Skeleton } from "@/components/ui/skeleton";
import { useAllStorefrontConfigurations } from "@/features/configurations/queries";

function ProductSectionSkeleton() {
  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-5">
        <Skeleton className="h-6 w-36 rounded" />
        <Skeleton className="h-4 w-16 rounded" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
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
    </section>
  );
}

function ProductSection({
  title,
  products,
  categorySlug,
}: {
  title: string;
  products: StorefrontProduct[];
  categorySlug?: string;
}) {
  if (products.length === 0) return null;

  return (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className="w-1 h-6 rounded-full bg-primary" />
          <h2 className="text-xl font-bold">{title}</h2>
        </div>
        {categorySlug && (
          <Link
            href={`/products?category=${encodeURIComponent(categorySlug)}`}
            className="flex items-center gap-0.5 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            View all <ChevronRight className="size-4" />
          </Link>
        )}
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {products.map((product) => (
          <ProductItem key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}

export function ProductList() {
  const { data: configurations } = useAllStorefrontConfigurations();

  const enabledSections =
    configurations?.["product-sections"]
      ?.filter((s) => s.enabled && s.categorySlug)
      .sort((a, b) => a.displayOrder - b.displayOrder) ?? [];

  const categorySlugs = configurations
    ? Array.from(new Set(enabledSections.map((s) => s.categorySlug!)))
    : undefined;

  const { data, isLoading, isError } = useStorefrontProducts(categorySlugs);

  if (isLoading)
    return (
      <>
        <ProductSectionSkeleton />
        <ProductSectionSkeleton />
      </>
    );

  if (isError)
    return (
      <p className="py-10 text-center text-muted-foreground">
        Failed to load products. Please try again.
      </p>
    );

  if (!data) return null;

  return (
    <>
      <ProductSection title="New Arrivals" products={data.newProducts} />
      <ProductSection title="Featured" products={data.featuredProducts} />
      {enabledSections.map(({ categorySlug, title, categoryName }) => (
        <ProductSection
          key={categorySlug}
          title={title ?? categoryName ?? ""}
          products={data[slugToKey(categorySlug!)] ?? []}
          categorySlug={categorySlug ?? undefined}
        />
      ))}
    </>
  );
}
