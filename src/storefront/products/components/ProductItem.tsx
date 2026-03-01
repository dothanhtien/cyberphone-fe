"use client";

import Link from "next/link";
import Image from "next/image";
import { Heart, ShoppingCart } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { StorefrontProduct } from "../types";
import { formatCurrency } from "@/utils/currency";
import { useCartStore } from "@/stores/cart";
import { useAddToCart } from "@/storefront/cart/mutations";

interface ProductItemProps {
  product: StorefrontProduct;
}

export function ProductItem({ product }: ProductItemProps) {
  const addToCartMutation = useAddToCart();
  const { addItem } = useCartStore((state) => state);
  const { cart } = useCartStore((state) => state);

  const handleClickAddToCart = () => {
    if (!cart) return;

    addToCartMutation.mutate(
      {
        cartId: cart.id,
        data: {
          variantId: product.variantId,
          quantity: 1,
        },
      },
      {
        onSuccess: (data) => {
          toast.success("Add to cart successfully", { position: "top-right" });
          addItem(data);
        },
      },
    );
  };

  return (
    <Card>
      <CardContent>
        <Link
          key={product.id}
          href={`/products/${product.id}`}
          className="block"
        >
          <div>
            <Image
              src={product.mainImage ?? "/images/default.png"}
              width={300}
              height={300}
              alt={product.name}
              className="mx-auto"
              loading="eager"
            />
          </div>

          <h3 className="font-bold mt-5 mb-3">
            {product.name.length > 40
              ? `${product.name.slice(0, 40)}...`
              : product.name}
          </h3>
          <p className="font-semibold text-base text-red-700">
            {formatCurrency(product.salePrice ?? product.price)} VND
          </p>
          {product.salePrice != null && product.salePrice < product.price ? (
            <p className="font-semibold line-through text-muted-foreground">
              {formatCurrency(product.price)} VND
            </p>
          ) : (
            <div className="h-5" aria-hidden></div>
          )}
        </Link>
      </CardContent>

      <CardFooter className="flex justify-between">
        <div>
          <Button asChild>
            <Link href="/checkout/cart">Buy now</Link>
          </Button>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            aria-label="Add to cart"
            onClick={handleClickAddToCart}
          >
            <ShoppingCart />
          </Button>
          <Button
            variant="destructive"
            size="icon"
            aria-label="Add to wishlist"
          >
            <Heart />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
