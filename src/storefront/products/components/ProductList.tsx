"use client";

import { ProductItem } from "./ProductItem";
import { useStorefrontProducts } from "../queries";
import { StorefrontProduct } from "../types";
import { slugToKey } from "../graphql";
import { useAllStorefrontConfigurations } from "@/features/configurations/queries";

function ProductSection({
  title,
  products,
}: {
  title: string;
  products: StorefrontProduct[];
}) {
  if (products.length === 0) return null;

  return (
    <section className="mb-10">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <div className="grid lg:grid-cols-5 sm:grid-cols-2 grid-cols-1 gap-6">
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

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Failed to load products. Please try again.</div>;

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
        />
      ))}
    </>
  );
}
