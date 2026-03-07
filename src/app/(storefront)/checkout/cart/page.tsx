"use client";

import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/stores/cart";
import { ReviewCartItem } from "@/storefront/checkout/components/ReviewCartItem";
import { formatCurrency } from "@/utils/currency";

export default function CheckoutCartPage() {
  const router = useRouter();
  const { cart, hasHydrated } = useCartStore((state) => state);
  const subtotal = useCartStore((state) => state.subtotal);

  if (!hasHydrated) return null;

  return (
    <div className="grid grid-cols-5 gap-6">
      <div className="col-span-3">
        <h2 className="font-bold mb-3">Cart items</h2>
        {(cart?.items?.length ?? 0) === 0 ? (
          <Card className="mb-3">
            <CardContent>Your cart is empty.</CardContent>
          </Card>
        ) : (
          cart?.items.map((item) => (
            <ReviewCartItem key={item.id} item={item} />
          ))
        )}

        <Button
          onClick={() => router.push("/checkout/shipping")}
          disabled={(cart?.items?.length ?? 0) === 0}
          className="w-full mt-1"
        >
          Continue
        </Button>
      </div>

      <div className="col-span-2">
        <h2 className="font-bold mb-3">Order summary</h2>
        <Card>
          <CardContent>
            <div className="font-bold flex justify-between mb-3">
              <div>Subtotal</div>
              <div className="text-red-700">
                {formatCurrency(subtotal())} VND
              </div>
            </div>

            <div className="font-bold flex justify-between mb-3">
              <div>Shipping fee</div>
              <div className="text-red-700">0 VND</div>
            </div>

            <Separator className="my-6" />

            <div className="font-bold flex justify-between">
              <div>Total amount</div>
              <div className="text-red-700">
                {formatCurrency(subtotal())} VND
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
