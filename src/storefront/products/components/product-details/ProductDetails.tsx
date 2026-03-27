"use client";

import { useState } from "react";
import { CreditCard, ShoppingCart } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { useStorefrontProductDetails } from "../../queries";
import { Description } from "./Description";
import { ProductDetailsGallery } from "./ImageGallery";
import { VariantSelector } from "./VariantSelector";
import { StorefrontVariant } from "../../types";
import { formatCurrency } from "@/utils";
import { ErrorCard } from "@/components/ErrorCard";
import { PageLoading } from "@/components/PageLoading";
import { useAddToCart } from "@/storefront/cart/mutations";
import { useCartStore } from "@/stores/cart";

export function ProductDetails({ slug }: { slug: string }) {
  const { data, isLoading } = useStorefrontProductDetails(slug);
  const [selectedVariant, setSelectedVariant] = useState<
    StorefrontVariant | undefined
  >();

  const addToCartMutation = useAddToCart();
  const { addItem } = useCartStore((state) => state);
  const { cart } = useCartStore((state) => state);

  const handleClickAddToCart = () => {
    if (!cart) {
      toast.error("Cart is loading. Please try again.");
      return;
    }

    if (!selectedVariant) return;

    addToCartMutation.mutate(
      {
        cartId: cart.id,
        data: {
          variantId: selectedVariant?.id,
          quantity: 1,
        },
      },
      {
        onSuccess: (data) => {
          toast.success("Add to cart successfully", {
            position: "bottom-right",
          });
          addItem(data);
        },
        onError: () => {
          toast.error("Unable to add item to cart. Please try again.");
        },
      },
    );
  };

  if (isLoading) return <PageLoading className="min-h-[calc(100vh-180px)]" />;
  if (!data) return <ErrorCard title="Product not found" />;

  const variant = selectedVariant
    ? selectedVariant
    : data.variants.find((v) => v.isDefault) || data.variants[0];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-11 gap-6 mt-6 mb-12">
        <div className="col-span-1 md:col-span-1 xl:col-span-5">
          {data.images.length > 0 && (
            <ProductDetailsGallery images={data.images} />
          )}
        </div>

        <div className="hidden xl:block col-span-1"></div>

        <div className="col-span-1 md:col-span-1 xl:col-span-5">
          <h1 className="font-bold text-2xl mb-6">{variant.name}</h1>

          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:gap-4">
            <div className="text-red-500 text-2xl font-semibold">
              {formatCurrency(variant.salePrice ?? variant.price)} VND
            </div>
            {variant.salePrice && (
              <div className="text-muted-foreground line-through mt-2 sm:mt-0">
                {formatCurrency(variant.price)} VND
              </div>
            )}
          </div>

          <div className="mb-6 text-sm text-muted-foreground font-semibold">
            Stock quantity: {variant.stockQuantity}
          </div>

          <VariantSelector
            attributes={data.attributes}
            variants={data.variants}
            onChange={setSelectedVariant}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button className="p-5">
              <CreditCard size={20} /> Buy now
            </Button>
            <Button
              className="p-5"
              variant="outline"
              onClick={handleClickAddToCart}
            >
              <ShoppingCart size={20} /> Add to cart
            </Button>
          </div>
        </div>
      </div>

      {data.longDescription && (
        <div className="pt-20">
          <Description description={data.longDescription} />
        </div>
      )}
    </>
  );
}
