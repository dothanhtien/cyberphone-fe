import Image from "next/image";
import { CreditCard, Truck } from "lucide-react";

import { PageHeading } from "@/components/PageHeading";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PaymentMethod } from "@/enums";
import { OrderItemsTable } from "@/features/orders/components/order-items-table/OrderItemsTable";
import { OrderStatusBadge } from "@/features/orders/components/OrderStatusBadge";
import { PaymentHistoryTable } from "@/features/orders/components/PaymentHistoryTable";
import { PaymentStatusBadge } from "@/features/orders/components/PaymentStatusBadge";
import { OrderDetails } from "@/features/orders/types";
import { capitalize, formatCurrency } from "@/utils";

function InfoRow({
  label,
  inline,
  children,
}: {
  label: string;
  inline?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={inline ? "flex items-center gap-4" : "flex flex-col gap-0.5"}
    >
      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide shrink-0">
        {label}
      </span>
      <div className="text-sm">{children}</div>
    </div>
  );
}

interface OrderDetailsViewProps {
  order: OrderDetails;
  actions?: React.ReactNode;
}

export function OrderDetailsView({ order, actions }: OrderDetailsViewProps) {
  const orderItems = order.items ?? [];

  const shippingAddress = [
    order.shipping.ward,
    order.shipping.district,
    order.shipping.city,
    order.shipping.country,
    order.shipping.postalCode,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-3">
        <PageHeading className="break-all">{order.code}</PageHeading>
        <OrderStatusBadge status={order.orderStatus} />
        <PaymentStatusBadge status={order.paymentStatus} />
        {actions && <div className="ml-auto">{actions}</div>}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">
                Items ({orderItems.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <OrderItemsTable data={orderItems} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Payment History</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <PaymentHistoryTable payments={order.payments ?? []} />
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="space-y-2.5 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>
                    {formatCurrency(order.itemsTotal ?? "0")}{" "}
                    <span className="text-xs text-muted-foreground">VND</span>
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping fee</span>
                  <span>
                    {formatCurrency(order.shipping.fee ?? "0")}{" "}
                    <span className="text-xs text-muted-foreground">VND</span>
                  </span>
                </div>

                {parseFloat(order.discountTotal || "0") > 0 && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Discount</span>
                    <span className="text-red-500">
                      -{formatCurrency(order.discountTotal ?? "0")}{" "}
                      <span className="text-xs">VND</span>
                    </span>
                  </div>
                )}

                <Separator />

                <div className="flex justify-between text-base font-semibold">
                  <span>Total</span>
                  <span>
                    {formatCurrency(order.orderTotal ?? "0")}{" "}
                    <span className="text-xs font-normal text-muted-foreground">
                      VND
                    </span>
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Truck className="h-4 w-4" />
                Shipping
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <InfoRow label="Recipient">
                <div className="space-y-0.5">
                  <div className="font-medium">{order.shipping.name}</div>
                  <div className="text-muted-foreground">
                    {order.shipping.phone}
                  </div>
                  {order.shipping.email && (
                    <div className="text-muted-foreground">
                      {order.shipping.email}
                    </div>
                  )}
                </div>
              </InfoRow>

              <InfoRow label="Address">
                <div className="space-y-0.5 text-muted-foreground">
                  <div>{order.shipping.line1}</div>
                  {order.shipping.line2 && <div>{order.shipping.line2}</div>}
                  <div>{shippingAddress}</div>
                </div>
              </InfoRow>

              <InfoRow label="Method">
                <span className="text-muted-foreground">
                  {capitalize(order.shipping.method)}
                </span>
              </InfoRow>

              {order.shipping.note && (
                <InfoRow label="Note">
                  <span className="text-muted-foreground">
                    {order.shipping.note}
                  </span>
                </InfoRow>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <CreditCard className="h-4 w-4" />
                Payment
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <InfoRow label="Status" inline>
                <PaymentStatusBadge status={order.paymentStatus} />
              </InfoRow>

              <InfoRow label="Method" inline>
                {order.paymentMethod === PaymentMethod.MOMO ? (
                  <div className="flex items-center gap-2">
                    <Image
                      src="/images/payment-methods/momo.png"
                      width={24}
                      height={24}
                      alt="momo"
                      className="rounded"
                    />
                    <span className="text-muted-foreground">MoMo</span>
                  </div>
                ) : (
                  <span className="text-muted-foreground">
                    {capitalize(order.paymentMethod)}
                  </span>
                )}
              </InfoRow>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
