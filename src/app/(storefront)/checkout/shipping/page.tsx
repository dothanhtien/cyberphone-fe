"use client";

import { useRouter } from "next/navigation";

import { OrderSummary } from "@/storefront/cart/components/OrderSummary";
import { ShippingForm } from "@/storefront/checkout/components/ShippingForm";
import { AddressFormValues } from "@/storefront/checkout/schemas";
import { useCheckoutStore } from "@/stores/checkout";

export default function CheckoutShippngPage() {
  const router = useRouter();
  const { shippingAddress, hasHydrated } = useCheckoutStore((state) => state);
  const setShippingAddress = useCheckoutStore(
    (state) => state.setShippingAddress,
  );

  const handleSubmit = (values: AddressFormValues) => {
    setShippingAddress(values);
    router.push("/checkout/payment");
  };

  if (!hasHydrated) return;

  return (
    <div className="grid grid-cols-5 gap-4">
      <ShippingForm onSubmit={handleSubmit} address={shippingAddress} />

      <div className="col-span-2">
        <OrderSummary />
      </div>
    </div>
  );
}
