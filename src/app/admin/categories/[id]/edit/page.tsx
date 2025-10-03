"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { AxiosError } from "axios";
import { AlertCircleIcon } from "lucide-react";
import { toast } from "sonner";

import { PageHeading } from "@/components/pageHeading";
import { Loading } from "@/components/loading";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { CategoryForm } from "../../new/components/categoryForm";
import { Category } from "@/interfaces";
import { apiService } from "@/lib/api";
import { clearCurrentCategory } from "@/lib/store/features/categories/categoriesSlice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";

export default function EditCategoryPage() {
  const { id } = useParams<{ id: string }>();
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(false);
  const currentCategory = useAppSelector(
    (state) => state.categories.currentCategory
  );
  const dispatch = useAppDispatch();

  const fetchCategory = useCallback(async () => {
    try {
      setLoading(true);
      const result = await apiService.categories.getCategory(id);
      setCategory(result.data);
    } catch (err) {
      const errorMessage =
        err instanceof AxiosError
          ? err.response?.data?.message ?? "Request failed"
          : "Failed to fetch category";
      console.error(errorMessage, err);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (currentCategory) {
      setCategory(currentCategory);
      dispatch(clearCurrentCategory());
      setLoading(false);
    } else {
      fetchCategory();
    }
  }, [currentCategory, dispatch, fetchCategory]);

  return (
    <>
      <PageHeading>Edit category</PageHeading>

      {loading && <Loading />}

      {!loading && !category && (
        <Alert variant="destructive">
          <AlertCircleIcon className="h-4 w-4" />
          <AlertTitle>Category not found.</AlertTitle>
        </Alert>
      )}

      {!loading && category && (
        <CategoryForm action="update" category={category} />
      )}
    </>
  );
}
