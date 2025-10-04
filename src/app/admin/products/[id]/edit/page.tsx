"use client";

import { useCallback, useEffect, useState } from "react";
import { useParams } from "next/navigation";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeading } from "@/components/pageHeading";
import { Loading } from "@/components/loading";
import { NotFoundAlert } from "@/components/notFoundAlert";
import { ProductForm } from "../../components/productForm";
import { ProductVariantList } from "./components/productVariantList";
import { Product } from "@/interfaces";
import { apiService } from "@/lib/api";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { clearCurrentProduct } from "@/lib/store/features/products/productsSlice";

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);

  const currentProduct = useAppSelector(
    (state) => state.products.currentProduct
  );
  const dispatch = useAppDispatch();

  const fetchProduct = useCallback(async () => {
    try {
      setLoading(true);
      const result = await apiService.products.getProduct(id);
      setProduct(result.data);
    } catch (error) {
      console.error("Error fetching product:", error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (currentProduct) {
      setProduct(currentProduct);
      dispatch(clearCurrentProduct());
    } else {
      fetchProduct();
    }
  }, [currentProduct, dispatch, fetchProduct]);

  return (
    <>
      <PageHeading>Edit product</PageHeading>

      {loading && <Loading />}

      {!loading && !product && (
        <NotFoundAlert>Product not found.</NotFoundAlert>
      )}

      {!loading && product && (
        <Tabs defaultValue="general">
          <TabsList className="mb-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="variants">Variants</TabsTrigger>
          </TabsList>

          <TabsContent value="general">
            <div className="border rounded-lg p-6">
              <ProductForm action="update" product={product} />
            </div>
          </TabsContent>

          <TabsContent value="variants">
            <ProductVariantList productId={product.id} />
          </TabsContent>
        </Tabs>
      )}
    </>
  );
}
