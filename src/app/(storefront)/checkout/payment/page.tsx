"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CreditCard, Wallet } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { OrderSummary } from "@/storefront/cart/components/OrderSummary";
import { useCreatePayment } from "@/storefront/payment/mutations";
import { useCreateOrder } from "@/storefront/order/mutations";
import { useCartStore } from "@/stores/cart";
import { useCheckoutStore } from "@/stores/checkout";
import { PaymentProvider } from "@/enums";

const paymentMethods = [
  // {
  //   id: PaymentProvider.COD,
  //   label: "Cash on Delivery (COD)",
  //   icon: CircleDollarSign,
  // },
  // {
  //   id: PaymentProvider.BANK_TRANSFER,
  //   label: "Bank transfer",
  //   icon: Landmark,
  // },
  {
    id: PaymentProvider.MOMO,
    label: "Momo",
    icon: Wallet,
  },
];

export default function CheckoutPaymentPage() {
  const router = useRouter();

  const [paymentMethod, setPaymentMethod] = useState<PaymentProvider | null>(
    null,
  );

  const { cart, hasHydrated: hasCartHydrated } = useCartStore((state) => state);
  const { shippingAddress, hasHydrated: hasCheckoutHydrated } =
    useCheckoutStore((state) => state);

  const createOrderMutation = useCreateOrder();
  const createPaymentMutation = useCreatePayment();

  const handleCreatePayment = (data: { id: string }) => {
    if (!paymentMethod) return;

    const redirectUrl = process.env.NEXT_PUBLIC_PAYMENT_REDIRECT_URL;

    if (!redirectUrl) {
      toast.error("Redirect URL has not been set up");
      return;
    }

    createPaymentMutation.mutate(
      {
        orderId: data.id,
        provider: paymentMethod,
        redirectUrl: redirectUrl,
      },
      {
        onSuccess: (data) => {
          router.push(data.payUrl);
        },
        onError: () => {
          toast.error("Cannot create payment");
        },
      },
    );
  };

  const handleCreateOrder = () => {
    if (!cart) {
      toast.error("Your cart is empty");
      router.replace("/cart");
      return;
    }

    if (!shippingAddress) {
      toast.error("Please enter a shipping address first");
      router.replace("/checkout/shipping");
      return;
    }
    if (!paymentMethod) return;

    createOrderMutation.mutate(
      {
        cartId: cart.id,
        shippingName: `${shippingAddress.firstName} ${shippingAddress.lastName}`,
        shippingPhone: shippingAddress.phone,
        shippingAddressLine1: shippingAddress.line1,
        shippingCity: shippingAddress.city,
        shippingDistrict: shippingAddress.district,
        shippingWard: shippingAddress.ward,
        paymentMethod: paymentMethod,
        shippingMethod: "standard",
      },
      {
        onSuccess: handleCreatePayment,
        onError: () => {
          toast.error("An error occured when proceeding checkout");
        },
      },
    );
  };

  const handleProceedCheckout = () => {
    if (!paymentMethod) {
      toast.error("Please select a payment method");
      return;
    }

    handleCreateOrder();
  };

  if (!hasCartHydrated || !hasCheckoutHydrated) return null;

  return (
    <div className="grid grid-cols-5 gap-4 items-start">
      <Card className="col-span-3">
        <CardHeader>
          <CardTitle className="font-bold flex gap-2">
            <CreditCard /> <span>Payment method</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup
            className="mt-3"
            value={paymentMethod}
            onValueChange={(value: PaymentProvider) => setPaymentMethod(value)}
          >
            {paymentMethods.map((method) => (
              <Card
                key={method.id}
                onClick={() => setPaymentMethod(method.id)}
                className={`cursor-pointer transition ${
                  paymentMethod === method.id
                    ? "border-orange-400 ring-1 ring-orange-400"
                    : "hover:border-gray-400"
                }`}
              >
                <CardContent className="flex gap-4 items-center">
                  <RadioGroupItem value={method.id} id={method.id} />
                  <Label
                    htmlFor={method.id}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <method.icon size={16} />
                    <span>{method.label}</span>
                  </Label>
                </CardContent>
              </Card>
            ))}
          </RadioGroup>

          <div className="grid grid-cols-2 gap-4 pt-3">
            <Button variant="outline" asChild>
              <Link href="/checkout/shipping">Back</Link>
            </Button>

            <Button
              onClick={handleProceedCheckout}
              disabled={
                createOrderMutation.isPending || createPaymentMutation.isPending
              }
            >
              {createOrderMutation.isPending || createPaymentMutation.isPending
                ? "Processing..."
                : "Checkout"}
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="col-span-2">
        <OrderSummary />
      </div>
    </div>
  );
}
