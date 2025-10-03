"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { AxiosError } from "axios";
import { toast } from "sonner";

import { PageHeading } from "@/components/pageHeading";
import { Loading } from "@/components/loading";
import { NotFoundAlert } from "@/components/notFoundAlert";
import { BrandForm } from "../../components/brandForm";
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

      {!loading && !brand && <NotFoundAlert>Brand not found.</NotFoundAlert>}

      {!loading && brand && <BrandForm action="update" brand={brand} />}
    </>
  );
}
