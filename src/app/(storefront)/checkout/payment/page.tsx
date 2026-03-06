"use client";

import { CircleDollarSign, CreditCard, Landmark, Wallet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { OrderSummary } from "@/storefront/cart/components/OrderSummary";
import Link from "next/link";
import { useState } from "react";
import { useCreatePayment } from "@/storefront/payment/mutations";
import { useCreateOrder } from "@/storefront/order/mutations";
import { useCartStore } from "@/stores/cart";
import { useCheckoutStore } from "@/stores/checkout";
import { useRouter } from "next/navigation";

export default function CheckoutPaymentPage() {
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [error, setError] = useState<string>("");
  const { cart, hasHydrated: hasCartHydrated } = useCartStore((state) => state);
  const { shippingAddress, hasHydrated: hasCheckoutHydrated } =
    useCheckoutStore((state) => state);

  const createPaymentMutation = useCreatePayment();
  const createOrderMutation = useCreateOrder();

  const router = useRouter();

  const handleCreatePayment = (data: { id: string }) => {
    createPaymentMutation.mutate(
      {
        orderId: data.id,
        provider: paymentMethod,
        redirectUrl: "http://localhost:3000/checkout/result",
      },
      {
        onSuccess: (data) => {
          router.push(data.payUrl);
        },
      },
    );
  };

  const handleCreateOrder = () => {
    if (!cart || !shippingAddress) return;

    createOrderMutation.mutate(
      {
        cartId: cart.id,
        shippingName: `${shippingAddress.firstName} ${shippingAddress.lastName}`,
        shippingPhone: shippingAddress.phone,
        shippingAddressLine1: shippingAddress.line1,
        shippingCity: shippingAddress.city,
        shippingDistrict: shippingAddress.district,
        shippingWard: shippingAddress.ward ?? "Test Ward",
        paymentMethod: paymentMethod,
        shippingMethod: "Standard",
      },
      {
        onSuccess: (data) => {
          handleCreatePayment(data);
        },
      },
    );
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
            onValueChange={(value) => {
              setPaymentMethod(value);
              setError("");
            }}
          >
            <Card>
              <CardContent className="flex gap-4">
                <RadioGroupItem value="cod" id="cod" />
                <Label htmlFor="cod">
                  <CircleDollarSign size={16} />
                  <span>Cash on Delivery (COD)</span>
                </Label>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex gap-4">
                <RadioGroupItem value="bankTransfer" id="bankTransfer" />
                <Label htmlFor="bankTransfer">
                  <Landmark size={16} />
                  <span>Bank transfer</span>
                </Label>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="flex gap-4">
                <RadioGroupItem value="momo" id="momo" />
                <Label htmlFor="momo">
                  <Wallet size={16} />
                  <span>Momo</span>
                </Label>
              </CardContent>
            </Card>
          </RadioGroup>

          {error && <p className="text-sm text-red-700 mt-3">{error}</p>}

          <div className="grid grid-cols-2 gap-4 pt-3">
            <Button variant="outline" asChild>
              <Link href="/checkout/shipping">Back</Link>
            </Button>
            <Button
              onClick={() => {
                if (!paymentMethod) {
                  setError("Please select a payment method.");
                  return;
                }

                console.log("paymentMethod: ", paymentMethod);

                if (paymentMethod === "momo") {
                  handleCreateOrder();
                }
              }}
            >
              Proceed payment
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
