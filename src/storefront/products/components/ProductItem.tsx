"use client";

import { ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { StorefrontProduct } from "../types";
import { DEFAULT_IMAGE } from "@/constants";
import { Button } from "@/components/ui/button";
import { useAddToCart, useBuyNow } from "@/storefront/cart/mutations";
import { useAuthStore } from "@/stores/auth";
import { useCartStore } from "@/stores/cart";
import { useCheckoutStore } from "@/stores/checkout";
import { formatCurrency } from "@/utils";

interface ProductItemProps {
  product: StorefrontProduct;
}

export function ProductItem({ product }: ProductItemProps) {
  const router = useRouter();
  const addToCartMutation = useAddToCart();
  const buyNowMutation = useBuyNow();
  const { addItem, cart } = useCartStore((state) => state);
  const user = useAuthStore((state) => state.user);
  const setActiveCart = useCheckoutStore((state) => state.setActiveCart);

  const handleClickBuyNow = () => {
    if (!product.variantId) {
      toast.error("Please select a variant before buying.");
      return;
    }

    buyNowMutation.mutate(
      {
        variantId: product.variantId,
        customerId: user?.id ?? undefined,
      },
      {
        onSuccess: (data) => {
          setActiveCart(data);
          router.push("/checkout/shipping");
        },
        onError: () => {
          toast.error("Unable to process. Please try again.");
        },
      },
    );
  };

  const hasSale =
    product.salePrice != null && product.salePrice < product.price;

  const handleClickAddToCart = () => {
    if (!cart) {
      toast.error("Cart is loading. Please try again.");
      return;
    }

    if (!product.variantId) {
      toast.error("Please select a variant before adding to cart.");
      return;
    }

    addToCartMutation.mutate(
      { cartId: cart.id, data: { variantId: product.variantId, quantity: 1 } },
      {
        onSuccess: (data) => {
          toast.success("Added to cart", { position: "bottom-right" });
          addItem(data);
        },
        onError: () => {
          toast.error("Unable to add item to cart. Please try again.");
        },
      },
    );
  };

  return (
    <div className="group flex flex-col rounded-xl border border-border bg-card overflow-hidden transition-shadow hover:shadow-md">
      <Link
        href={`/products/${product.slug}`}
        className="block relative overflow-hidden aspect-square"
      >
        {hasSale && (
          <span className="absolute top-2 left-2 z-5 rounded-full bg-red-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
            Sale
          </span>
        )}
        <Image
          src={product.mainImage ?? DEFAULT_IMAGE}
          fill
          alt={product.name}
          className="object-contain p-3 transition-transform duration-300 group-hover:scale-105"
          loading="eager"
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
        />
      </Link>

      <div className="flex flex-col flex-1 p-3 gap-1">
        <Link href={`/products/${product.slug}`}>
          <h3 className="text-sm font-semibold leading-snug line-clamp-2 hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="mt-auto pt-2">
          <p className="text-base font-bold text-red-600">
            {formatCurrency(product.salePrice ?? product.price)}{" "}
            <span className="text-xs font-normal">VND</span>
          </p>
          {hasSale ? (
            <p className="text-xs text-muted-foreground line-through">
              {formatCurrency(product.price)} VND
            </p>
          ) : (
            <div className="h-4" aria-hidden />
          )}
        </div>

        <div className="mt-2 flex gap-2">
          <Button
            size="sm"
            className="flex-1"
            onClick={handleClickBuyNow}
            disabled={buyNowMutation.isPending}
          >
            Buy now
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 size-7"
            aria-label="Add to cart"
            onClick={handleClickAddToCart}
            disabled={!cart || addToCartMutation.isPending}
          >
            <ShoppingCart className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
