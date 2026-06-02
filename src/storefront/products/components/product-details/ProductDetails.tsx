"use client";

import {
  CreditCard,
  ShoppingCart,
  PackageCheck,
  PackageX,
  AlertTriangle,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { Description } from "./Description";
import { ProductDetailsGallery } from "./ImageGallery";
import { VariantSelector } from "./VariantSelector";
import { useStorefrontProductDetails } from "../../queries";
import { StorefrontVariant } from "../../types";
import { ErrorCard } from "@/components/ErrorCard";
import { PageLoading } from "@/components/PageLoading";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useAddToCart, useBuyNow } from "@/storefront/cart/mutations";
import { useAuthStore } from "@/stores/auth";
import { useCartStore } from "@/stores/cart";
import { useCheckoutStore } from "@/stores/checkout";
import { formatCurrency } from "@/utils";

function StockStatus({ qty }: { qty: number }) {
  if (qty === 0)
    return (
      <span className="flex items-center gap-1.5 text-sm text-destructive font-medium">
        <PackageX className="size-4" /> Out of stock
      </span>
    );
  if (qty <= 5)
    return (
      <span className="flex items-center gap-1.5 text-sm text-amber-600 font-medium">
        <AlertTriangle className="size-4" /> Only {qty} left
      </span>
    );
  return (
    <span className="flex items-center gap-1.5 text-sm text-emerald-600 font-medium">
      <PackageCheck className="size-4" /> {qty} In stock
    </span>
  );
}

export function ProductDetails({ slug }: { slug: string }) {
  const { data, isLoading } = useStorefrontProductDetails(slug);
  const [selectedVariant, setSelectedVariant] = useState<
    StorefrontVariant | undefined
  >();

  const router = useRouter();
  const addToCartMutation = useAddToCart();
  const buyNowMutation = useBuyNow();
  const { addItem, cart } = useCartStore((state) => state);
  const user = useAuthStore((state) => state.user);
  const setActiveCart = useCheckoutStore((state) => state.setActiveCart);

  const handleClickAddToCart = () => {
    if (!cart) {
      toast.error("Cart is loading. Please try again.");
      return;
    }

    if (!selectedVariant) {
      toast.error("Please select a variant.");
      return;
    }

    addToCartMutation.mutate(
      { cartId: cart.id, data: { variantId: selectedVariant.id, quantity: 1 } },
      {
        onSuccess: (data) => {
          toast.success("Added to cart", { position: "bottom-right" });
          addItem(data);
        },
        onError: () =>
          toast.error("Unable to add item to cart. Please try again."),
      },
    );
  };

  const handleClickBuyNow = () => {
    if (!selectedVariant) {
      toast.error("Please select a variant.");
      return;
    }

    buyNowMutation.mutate(
      {
        variantId: selectedVariant.id,
        customerId: user?.id ?? undefined,
      },
      {
        onSuccess: (data) => {
          setActiveCart(data);
          router.push("/checkout/shipping");
        },
        onError: () => toast.error("Unable to process. Please try again."),
      },
    );
  };

  if (isLoading) return <PageLoading className="min-h-[calc(100vh-180px)]" />;

  if (!data) return <ErrorCard title="Product not found" />;

  const variant =
    selectedVariant ??
    data.variants.find((v) => v.isDefault) ??
    data.variants[0];

  const hasSale =
    variant.salePrice != null && variant.salePrice < variant.price;

  const discountPct = hasSale
    ? Math.round((1 - variant.salePrice! / variant.price) * 100)
    : 0;

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6 mb-12">
        <div className="md:sticky md:top-6 md:self-start">
          {data.images.length > 0 && (
            <ProductDetailsGallery images={data.images} />
          )}
        </div>

        <div className="flex flex-col gap-5">
          <h1 className="text-2xl font-bold leading-snug">{variant.name}</h1>

          <Separator />

          <div className="flex items-end gap-3">
            <span className="text-3xl font-bold text-red-600">
              {formatCurrency(variant.salePrice ?? variant.price)}
              <span className="text-base font-normal ml-1">VND</span>
            </span>
            {hasSale && (
              <>
                <span className="text-base text-muted-foreground line-through">
                  {formatCurrency(variant.price)} VND
                </span>
                <Badge variant="destructive" className="mb-0.5">
                  -{discountPct}%
                </Badge>
              </>
            )}
          </div>

          <StockStatus qty={variant.stockQuantity} />

          <Separator />

          <VariantSelector
            attributes={data.attributes}
            variants={data.variants}
            onChange={setSelectedVariant}
          />

          <div className="flex gap-3 pt-1">
            <Button
              size="lg"
              className="flex-1 gap-2"
              onClick={handleClickBuyNow}
              disabled={buyNowMutation.isPending || variant.stockQuantity === 0}
            >
              <CreditCard className="size-4" /> Buy now
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="flex-1 gap-2"
              onClick={handleClickAddToCart}
              disabled={
                !cart ||
                addToCartMutation.isPending ||
                variant.stockQuantity === 0
              }
            >
              <ShoppingCart className="size-4" /> Add to cart
            </Button>
          </div>
        </div>
      </div>

      {data.longDescription && (
        <div className="mt-4 mb-12">
          <Description description={data.longDescription} />
        </div>
      )}
    </>
  );
}
