"use client";

import { PageHeading } from "@/components/pageHeading";
import { CategoryForm } from "../components/categoryForm";

export default function NewCategoriesPage() {
  return (
    <>
      <PageHeading>New category</PageHeading>

      <CategoryForm />
    </>
  );
}
