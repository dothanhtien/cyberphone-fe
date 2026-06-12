"use client";

import { useParams } from "next/navigation";

import { ErrorCard } from "@/components/ErrorCard";
import { PageLoading } from "@/components/PageLoading";
import { OrderDetailsView } from "@/features/orders/components/OrderDetailsView";
import { useCustomerOrderDetails } from "@/features/orders/queries";
import { usePageLayout } from "@/hooks";

export default function OrderDetailsPage() {
  const { id: orderId } = useParams<{ id: string }>();

  const orderQuery = useCustomerOrderDetails(orderId);
  const order = orderQuery.data;

  usePageLayout({ segmentLabel: order ? `#${order.code}` : "" });

  if (orderQuery.isLoading) {
    return <PageLoading />;
  }

  if ((!orderQuery.isLoading && orderQuery.isError) || !order) {
    return <ErrorCard title="Order not found. Please try again." />;
  }

  return <OrderDetailsView order={order} />;
}
