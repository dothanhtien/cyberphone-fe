"use client";

import { PageHeading } from "@/components/pageHeading";
import { ProductForm } from "../components/components/productForm";

export default function NewProductPage() {
  return (
    <>
      <PageHeading>New product</PageHeading>

      <ProductForm />
    </>
  );
}
