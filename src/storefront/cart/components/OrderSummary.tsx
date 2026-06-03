import Image from "next/image";

import { DEFAULT_IMAGE } from "@/constants";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/stores/cart";
import { useCheckoutStore } from "@/stores/checkout";
import { formatCurrency } from "@/utils";

export function OrderSummary() {
  const { hasHydrated } = useCartStore((state) => state);
  const subtotal = useCartStore((state) => state.subtotal);
  const activeCart = useCheckoutStore((state) => state.activeCart);
  const hasCheckoutHydrated = useCheckoutStore((state) => state.hasHydrated);

  if (!hasHydrated || !hasCheckoutHydrated) return null;

  const activeSubtotal = activeCart
    ? activeCart.items.reduce(
        (sum, item) => sum + (item.salePrice ?? item.price) * item.quantity,
        0,
      )
    : subtotal();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-bold">Order summary</CardTitle>
      </CardHeader>

      <CardContent>
        {activeCart?.items.map((item) => (
          <div key={item.id} className="flex text-sm mb-3">
            <Image
              src={item.imageUrl ?? DEFAULT_IMAGE}
              loading="eager"
              width={100}
              height={100}
              alt={item.variantName}
            />

            <div className="space-y-1">
              <div className="font-bold">{item.variantName}</div>
              <div className="text-xs">Qty: {item.quantity}</div>
              <div className="font-bold text-red-700">
                {formatCurrency(item.salePrice ?? item.price)} VND
              </div>
            </div>
          </div>
        ))}

        <Separator className="my-6" />

        <div className="flex justify-between text-sm font-bold">
          <div>Total amount</div>
          <div className="text-red-700">
            {formatCurrency(activeSubtotal)} VND
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
