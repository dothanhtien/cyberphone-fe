"use client";

import { useEffect, useMemo } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CircleCheckBig, CircleX } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PaymentProvider } from "@/enums";
import { useStorefrontPayment } from "@/storefront/payment/queries";
import { StorefrontPayment } from "@/storefront/payment/types";
import { useCheckoutStore } from "@/stores/checkout";
import { useCartStore } from "@/stores/cart";

export default function CheckoutResultPage() {
  const searchParams = useSearchParams();
  const resetShippingAddress = useCheckoutStore(
    (state) => state.resetShippingAddress,
  );
  const resetCart = useCartStore((state) => state.resetCart);
  const setCanQueryCart = useCartStore((state) => state.setCanQueryCart);

  const { provider, params } = useMemo(() => {
    if (!searchParams) return { provider: undefined, params: undefined };

    const params = new URLSearchParams(searchParams.toString());

    let provider: PaymentProvider | undefined;

    if (params.has("partnerCode") && params.has("orderId")) {
      provider = PaymentProvider.MOMO;
    } else if (params.has("apptransid") || params.has("zptransid")) {
      provider = PaymentProvider.ZALOPAY;
    }

    return { provider, params };
  }, [searchParams]);

  const { data, isLoading, isError } = useStorefrontPayment(provider, params);

  const isSuccess = data?.status === "success";

  useEffect(() => {
    setCanQueryCart(!isLoading);

    if (data?.status === "success") {
      resetCart();
      resetShippingAddress();
    }
  }, [
    data?.status,
    isLoading,
    resetCart,
    resetShippingAddress,
    setCanQueryCart,
  ]);

  return (
    <Card>
      <CardContent className="text-center p-6">
        {(!provider || isError || (!isLoading && !data)) && (
          <h1 className="font-bold text-2xl mb-6">Something went wrong!</h1>
        )}

        {isLoading && (
          <h1 className="font-bold text-2xl mb-6">Verifying payment...</h1>
        )}

        {!isLoading &&
          data &&
          (isSuccess ? (
            <PaymentSuccessful data={data} />
          ) : (
            <PaymentUnsuccessful data={data} />
          ))}
      </CardContent>
    </Card>
  );
}

function PaymentSuccessful({ data }: { data: StorefrontPayment }) {
  return (
    <>
      <CircleCheckBig size={64} className="text-green-500 mx-auto mt-4 mb-8" />

      <div className="mb-6">
        <h1 className="font-bold text-2xl mb-3">Payment successful!</h1>
        <p>Thank you for shopping at CyberPhone</p>
      </div>

      <div className="mb-6">
        <div className="p-4 bg-gray-200 w-75 mx-auto rounded-lg">
          <div className="mb-1">Order number</div>
          <div className="font-bold text-lg">{data.orderCode}</div>
        </div>
      </div>

      <Button asChild>
        <Link href="/">Continue shopping</Link>
      </Button>
    </>
  );
}

function PaymentUnsuccessful({ data }: { data: StorefrontPayment }) {
  return (
    <>
      <CircleX size={64} className="text-red-500 mx-auto mt-4 mb-8" />

      <div className="mb-6">
        <h1 className="font-bold text-2xl mb-3">Payment unsuccessful!</h1>
        <p>Please contact the administrator for assistance</p>
      </div>

      <div className="mb-6">
        <div className="p-4 bg-gray-200 w-75 mx-auto rounded-lg">
          <div className="mb-1">Order number</div>
          <div className="font-bold text-lg">{data.orderCode}</div>
        </div>
      </div>

      <Button asChild>
        <Link href="/checkout/payment">Checkout again</Link>
      </Button>
    </>
  );
}
