import type { Metadata } from "next";

import { CheckoutStepIndicator } from "@/storefront/checkout/components/CheckoutStepIndicator";

export const metadata: Metadata = {
  title: "Cyberphone | Checkout",
  description: "Cyberphone storefront",
};

export default function StorefrontLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <CheckoutStepIndicator />
      {children}
    </>
  );
}
