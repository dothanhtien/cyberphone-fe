"use client";

import { useStorefrontProducts } from "../queries";
import { ProductItem } from "./ProductItem";

export function ProductList() {
  const { data, isLoading, isError } = useStorefrontProducts({});

  if (isLoading) return <div>Loading...</div>;

  if (isError) return <div>Failed to load products. Please try again.</div>;

  return (
    <section className="product-list grid lg:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-6">
      {(data?.items || []).map((item) => (
        <ProductItem key={item.id} product={item} />
      ))}
    </section>
  );
}
