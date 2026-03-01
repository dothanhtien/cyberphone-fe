"use client";

import Link from "next/link";
import { TabletSmartphone } from "lucide-react";

import { MiniCart } from "@/storefront/cart/components/MiniCart";

export function Navbar() {
  return (
    <>
      <header className="h-20 fixed w-full bg-white top-0 left-0 shadow-lg flex items-center">
        <div className="max-w-5xl container p-4 mx-auto flex justify-between">
          <Link href="/" className="logo font-bold">
            <span className="flex gap-1">
              <TabletSmartphone className="text-orange-400" /> CyberPhone
            </span>
          </Link>

          <MiniCart />
        </div>
      </header>

      <div className="header-offset h-20" aria-hidden="true"></div>
    </>
  );
}
