"use client";

import PageHeading from "@/components/pageHeading";
import { Category } from "@/interfaces";
import { apiService } from "@/lib/api";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CategoryForm } from "../../components/categoryForm";

export default function EditCategoryPage() {
  const { id } = useParams<{ id: string }>();
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchCategory = async () => {
      try {
        const result = await apiService.categories.getCategoryDetails(id);
        setCategory(result.data);
      } catch (error) {
        console.error("Failed to fetch category", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategory();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!category) {
    return <p>Category not found.</p>;
  }

  return (
    <>
      <PageHeading>Edit Category</PageHeading>

      <CategoryForm action="update" data={category} />
    </>
  );
}
