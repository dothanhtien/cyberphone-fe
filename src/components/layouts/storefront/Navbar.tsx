"use client";

import Link from "next/link";
import { LogIn, TabletSmartphone } from "lucide-react";

import { Button } from "@/components/ui/button";
import { MiniCart } from "@/storefront/cart/components/MiniCart";

export function Navbar() {
  return (
    <>
      <header className="h-20 fixed w-full bg-white top-0 left-0 shadow-lg flex items-center z-10">
        <div className="max-w-300 container p-4 mx-auto flex justify-between">
          <Link href="/" className="logo font-bold">
            <span className="flex gap-1">
              <TabletSmartphone className="text-orange-400" /> CyberPhone
            </span>
          </Link>

          <div className="flex items-center">
            <MiniCart />

            <Button variant="ghost" asChild>
              <Link href="/auth/login">
                <LogIn />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="header-offset h-20" aria-hidden="true"></div>
    </>
  );
}
