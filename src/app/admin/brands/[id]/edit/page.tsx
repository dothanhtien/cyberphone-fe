"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { AxiosError } from "axios";
import { AlertCircleIcon } from "lucide-react";
import { toast } from "sonner";

import { Alert, AlertTitle } from "@/components/ui/alert";
import PageHeading from "@/components/pageHeading";
import Loading from "@/components/loading";
import BrandForm from "../../new/components/brandForm";
import { Brand } from "@/interfaces";
import { apiService } from "@/lib/api";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { clearCurrentBrand } from "@/lib/store/features/brands/brandsSlice";

export default function EditBrandPage() {
  const { id } = useParams<{ id: string }>();
  const [brand, setBrand] = useState<Brand | null>(null);
  const [loading, setLoading] = useState(false);
  const currentBrand = useAppSelector((state) => state.brands.currentBrand);
  const dispatch = useAppDispatch();

  const fetchBrand = useCallback(async () => {
    try {
      setLoading(true);
      const result = await apiService.brands.getBrand(id);
      setBrand(result.data);
    } catch (err) {
      const errorMessage =
        err instanceof AxiosError
          ? err.response?.data?.message ?? "Request failed"
          : "Failed to fetch brand";
      console.error(errorMessage, err);
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (currentBrand) {
      setBrand(currentBrand);
      dispatch(clearCurrentBrand());
      setLoading(false);
    } else {
      fetchBrand();
    }
  }, [currentBrand, dispatch, fetchBrand]);

  return (
    <>
      <PageHeading>Edit brand</PageHeading>

      {loading && <Loading />}

      {!loading && !brand && (
        <Alert variant="destructive">
          <AlertCircleIcon className="h-4 w-4" />
          <AlertTitle>Brand not found.</AlertTitle>
        </Alert>
      )}

      {!loading && brand && <BrandForm action="update" brand={brand} />}
    </>
  );
}
