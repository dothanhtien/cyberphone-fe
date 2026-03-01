import Image from "next/image";
import { ShoppingCart } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverTitle,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/stores/cart";
import { formatCurrency } from "@/utils/currency";
import { useStorefrontCart } from "../queries";

export function MiniCart() {
  useStorefrontCart();

  const { cart, hasHydrated } = useCartStore((state) => state);
  const totalItems = useCartStore((state) => state.totalItems);
  const subtotal = useCartStore((state) => state.subtotal);

  const itemCount = totalItems();

  if (!hasHydrated) return null;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost">
          <div className="relative">
            <ShoppingCart />
            {!!itemCount && (
              <div
                className={`
                    absolute top-[-12] right-[-12] text-[9px] rounded-full bg-red-500 px-1 text-white 
                    w-4.5 h-4.5 flex justify-center items-center
                  `}
              >
                {itemCount}
              </div>
            )}
          </div>
        </Button>
      </PopoverTrigger>

      <PopoverContent align="end" className="w-120 p-4">
        <PopoverHeader>
          <PopoverTitle>My Cart ({itemCount})</PopoverTitle>
        </PopoverHeader>
        <div>
          {(cart?.items || []).map((item) => (
            <div
              key={item.id}
              className="my-4 flex justify-between items-center"
            >
              <div className="flex">
                <Image
                  src={item.imageUrl ?? "/images/default.png"}
                  alt=""
                  loading="eager"
                  width={64}
                  height={64}
                  className="object-contain rounded"
                  referrerPolicy="no-referrer"
                />

                <div className="flex flex-col justify-around">
                  <div className="font-semibold">{item.variantName}</div>
                  <div className="text-xs text-muted-foreground">
                    Qty: {item.quantity}
                  </div>
                </div>
              </div>

              <div className="font-semibold text-md text-red-700">
                {formatCurrency(item.salePrice ?? item.price)} VND
              </div>
            </div>
          ))}
        </div>

        <Separator />

        <div className="flex justify-between font-semibold my-4">
          <div>SUBTOTAL</div>
          <div className="text-red-700">{formatCurrency(subtotal())} VND</div>
        </div>

        <Button>Checkout now</Button>
        <Button variant="outline">View shoping cart</Button>
      </PopoverContent>
    </Popover>
  );
}
