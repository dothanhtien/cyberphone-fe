"use client";

import { ProductItem } from "./ProductItem";
import { useStorefrontProducts } from "../queries";
import { StorefrontProduct } from "../types";
import { HOME_CATEGORY_SECTIONS } from "@/config/storefront";

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
  const { data, isLoading, isError } = useStorefrontProducts();

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Failed to load products. Please try again.</div>;

  if (!data) return null;

  return (
    <>
      <ProductSection title="New Arrivals" products={data.newProducts} />
      <ProductSection title="Featured" products={data.featuredProducts} />
      {HOME_CATEGORY_SECTIONS.map(({ slug, label }) => (
        <ProductSection
          key={slug}
          title={label}
          products={data[slug.replace(/-/g, "_")] ?? []}
        />
      ))}
    </>
  );
}
