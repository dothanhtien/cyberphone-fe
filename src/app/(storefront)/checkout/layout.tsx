import type { Metadata } from "next";

import { CheckoutStepIndicator } from "@/storefront/checkout/components/CheckoutStepIndicator";
import { STORE_NAME } from "@/config";

export const metadata: Metadata = {
  title: `${STORE_NAME} | Checkout`,
  description: `${STORE_NAME} storefront`,
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
