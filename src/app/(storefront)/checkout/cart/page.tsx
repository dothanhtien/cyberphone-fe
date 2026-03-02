"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/stores/cart";
import { formatCurrency } from "@/utils/currency";
import { CartItem } from "@/storefront/cart/components/checkout/cart/CartItem";

export default function CheckoutCartPage() {
  const { cart, hasHydrated } = useCartStore((state) => state);
  const subtotal = useCartStore((state) => state.subtotal);

  const [loading, setLoading] = useState(false);

  const handlePlaceOrder = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 3000);
  };

  if (!hasHydrated) return null;

  return (
    <div className="grid grid-cols-5 gap-6">
      <div className="col-span-3">
        <h2 className="font-bold mb-3">Cart items</h2>
        {cart?.items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}

        <Button
          onClick={handlePlaceOrder}
          disabled={loading}
          className="w-full mt-1"
        >
          {loading ? (
            <>
              <Spinner data-icon="inline-start" />
              Processing...
            </>
          ) : (
            <>Place order</>
          )}
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
