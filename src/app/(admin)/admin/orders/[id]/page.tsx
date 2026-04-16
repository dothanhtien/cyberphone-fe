"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import { CreditCard, Truck } from "lucide-react";

import { ErrorCard } from "@/components/ErrorCard";
import { PageHeading } from "@/components/PageHeading";
import { PageLoading } from "@/components/PageLoading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PaymentMethod } from "@/enums";
import { OrderItemsTable } from "@/features/orders/components/order-items-table/OrderItemsTable";
import { OrderStatusBadge } from "@/features/orders/components/OrderStatusBadge";
import { PaymentStatusBadge } from "@/features/orders/components/PaymentStatusBadge";
import { useOrderDetails } from "@/features/orders/queries";
import { usePageLayout } from "@/hooks";
import { capitalize, formatCurrency } from "@/utils";

export default function OrderDetailsPage() {
  const { id: orderId } = useParams<{ id: string }>();

  const orderQuery = useOrderDetails(orderId);

  const order = orderQuery.data;
  const orderItems = orderQuery.data?.items ?? [];

  usePageLayout({ segmentLabel: order ? `#${order.code}` : "" });

  if (orderQuery.isLoading) {
    return <PageLoading />;
  }

  if ((!orderQuery.isLoading && orderQuery.isError) || !order) {
    return <ErrorCard title="Order not found. Please try again." />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <PageHeading className="break-all">#{order.code}</PageHeading>
        <OrderStatusBadge status={order.orderStatus} />
      </div>

      <OrderItemsTable data={orderItems} />

      <Card className="bg-muted">
        <CardContent>
          <div className="flex justify-end">
            <div className="space-y-2">
              <div className="grid grid-cols-2 gap-4">
                <div>Subtotal</div>
                <div className="text-right">
                  {formatCurrency(order.itemsTotal ?? "0")}
                  <span className="ml-1">VND</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>Shipping fee</div>
                <div className="text-right">
                  {formatCurrency(order.shipping.fee ?? "0")}
                  <span className="ml-1">VND</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>Discount</div>
                <div className="text-right text-red-500">
                  {formatCurrency(order.discountTotal ?? "0")}
                  <span className="ml-1">VND</span>
                </div>
              </div>

              <Separator />

              <div className="grid grid-cols-2 gap-2 sm:gap-4 text-base sm:text-lg font-semibold">
                <div>Total</div>
                <div className="text-right">
                  {formatCurrency(order.orderTotal ?? "0")}
                  <span className="ml-1">VND</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Truck />
              <div>Shipping information</div>
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div>
              <div className="font-semibold">Recipient</div>
              <div className="wrap-break-word">{order.shipping.name}</div>
              <div className="wrap-break-word">{order.shipping.phone}</div>
              <div className="wrap-break-word">{order.shipping.email}</div>
            </div>

            <div>
              <div className="font-semibold">Address</div>
              <div className="wrap-break-word">{order.shipping.line1}</div>
              <div className="wrap-break-word">{order.shipping.line2}</div>

              <div className="wrap-break-word">
                {[
                  order.shipping.ward,
                  order.shipping.district,
                  order.shipping.city,
                  order.shipping.country,
                  order.shipping.postalCode,
                ]
                  .filter(Boolean)
                  .join(", ")}
              </div>
            </div>

            <div>
              <div className="font-semibold">Method</div>
              <div>{capitalize(order.shipping.method)}</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard />
              <div>Payment information</div>
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <div className="font-semibold">Status</div>
              <PaymentStatusBadge status={order.paymentStatus} />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="font-semibold">Method</div>
              {order.paymentMethod === PaymentMethod.MOMO ? (
                <Image
                  src="/images/payment-methods/momo.png"
                  width={32}
                  height={32}
                  alt="momo"
                />
              ) : (
                <div>{capitalize(order.paymentMethod)}</div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
