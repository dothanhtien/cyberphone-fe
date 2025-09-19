"use client";

import PageHeading from "@/components/pageHeading";
import ProductForm from "../components/forms/productForm";

export default function NewProductPage() {
  return (
    <div className="max-w-[800px]">
      <PageHeading>New product</PageHeading>

      <ProductForm />
    </div>
  );
}
