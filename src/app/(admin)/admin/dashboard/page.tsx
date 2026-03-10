"use client";

import React from "react";
import Image from "next/image";
import {
  Banknote,
  LucideProps,
  ShoppingCart,
  TriangleAlert,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { PageHeading } from "@/components/PageHeading";
import { RevenueOverviewChart } from "@/features/dashboard/components/RevenueOverviewChart";
import { SaleByCategoryChart } from "@/features/dashboard/components/SaleByCategoryChart";
import { RecentOrdersTable } from "@/features/dashboard/components/RecentOrdersTable";
import {
  useDashboardRevenue,
  useDashboardSummary,
} from "@/features/dashboard/queries";
import { formatCurrency } from "@/utils/currency";

export default function AdminDashboardPage() {
  const {
    data: summary,
    isLoading: isSummaryLoading,
    isError: isSummaryError,
  } = useDashboardSummary();

  const { data: revenue } = useDashboardRevenue();

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <div>
          <PageHeading className="mb-3">Welcome back, Admin</PageHeading>
          <p className="text-muted-foreground text-sm mb-3">
            Here&apos;s what&apos;s happening with your store
          </p>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6 mb-6">
        <DashboardCard
          title="Total revenue"
          value={`${formatCurrency(summary?.totalRevenue ?? 0)} VND`}
          icon={Banknote}
          isLoading={isSummaryLoading}
        />

        <DashboardCard
          title="Total orders"
          value={summary?.totalOrders ?? 0}
          icon={ShoppingCart}
          isLoading={isSummaryLoading}
        />

        <DashboardCard
          title="Low stock products"
          value={summary?.lowStockProducts ?? 0}
          icon={TriangleAlert}
          isLoading={isSummaryLoading}
        />
      </div>

      <div className="grid grid-cols-5 gap-6 mb-6">
        <div className="col-span-3">
          <RevenueOverviewChart data={revenue ?? []} />
        </div>

        <div className="col-span-2">
          <SaleByCategoryChart />
        </div>
      </div>

      <div className="grid grid-cols-5 gap-6">
        <div className="col-span-3">
          <Card>
            <CardHeader>
              <CardTitle>Recent orders</CardTitle>
            </CardHeader>
            <CardContent>
              <RecentOrdersTable data={[]} />
            </CardContent>
          </Card>
        </div>

        <div className="col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Top products</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="flex">
                <Image
                  className="rounded-lg"
                  alt=""
                  height={64}
                  width={64}
                  loading="eager"
                  src="https://res.cloudinary.com/tiendeptrai/image/upload/v1772988226/cyberphone/products/gry3or3jsmsqtutypjf8.webp"
                />

                <div>
                  <div className="mb-1 font-semibold">
                    Phone 17 Pro 256GB Cam Vũ Trụ
                  </div>
                  <div className="text-muted-foreground">12 sales</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}

interface DashboardCardProps {
  title: string;
  value: number | string;
  icon: React.ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
  >;
  isLoading: boolean;
}

function DashboardCard({
  title,
  value,
  icon: Icon,
  isLoading,
}: DashboardCardProps) {
  return (
    <Card className="py-6 px-2">
      <CardHeader>
        <CardTitle className="flex items-center gap-6">
          <Badge variant="secondary">
            <Icon size={16} />
          </Badge>
          <div>{title}</div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <Spinner />
        ) : (
          <p className="font-semibold block px-1.5 text-lg">{value}</p>
        )}
      </CardContent>
    </Card>
  );
}
