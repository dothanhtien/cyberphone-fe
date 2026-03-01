"use client";

import Link from "next/link";
import { ShoppingCart, TabletSmartphone } from "lucide-react";
import { useMemo } from "react";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/stores/cart";
import { useStorefrontCart } from "@/storefront/cart/queries";

export function Navbar() {
  const hasHydrated = useCartStore((state) => state.hasHydrated);
  const totalItems = useCartStore((state) => state.totalItems);
  const itemCount = useMemo(() => {
    return hasHydrated ? totalItems() : 0;
  }, [totalItems, hasHydrated]);

  useStorefrontCart();

  return (
    <>
      <header className="h-20 fixed w-full bg-white top-0 left-0 shadow-lg flex items-center">
        <div className="max-w-5xl container p-4 mx-auto flex justify-between">
          <Link href="/" className="logo font-bold">
            <span className="flex gap-1">
              <TabletSmartphone className="text-orange-400" /> CyberPhone
            </span>
          </Link>

          <Button variant="ghost" asChild>
            <Link href="/checkout">
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
            </Link>
          </Button>
        </div>
      </header>

      <div className="header-offset h-20" aria-hidden="true"></div>
    </>
  );
}
