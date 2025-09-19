"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

import PageHeading from "@/components/pageHeading";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductForm from "../../components/forms/productForm";
import ProductVariantsForm from "../../components/forms/productVariantForm";
import { Product } from "@/interfaces";
import { apiService } from "@/lib/api";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { clearCurrentProduct } from "@/lib/store/features/products/productsSlice";

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const currentProduct = useAppSelector(
    (state) => state.products.currentProduct
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (product) return;

    if (currentProduct) {
      setProduct(currentProduct);
      dispatch(clearCurrentProduct());
    } else {
      fetchProduct();
    }
  }, [id, product, currentProduct]);

  const fetchProduct = async () => {
    try {
      const result = await apiService.products.getProduct(id);
      setProduct(result.data);
    } catch (error) {
      console.error("An error occurred when fetching product", error);
    }
  };

  return (
    <>
      <PageHeading>Edit product</PageHeading>

      <Tabs defaultValue="general" className="w-[800px]">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="variants">Variants</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <ProductForm action="update" data={product} />
        </TabsContent>

        <TabsContent value="variants">
          <ProductVariantsForm />
        </TabsContent>
      </Tabs>
    </>
  );
}
