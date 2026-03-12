"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Banknote, ShoppingCart, TriangleAlert } from "lucide-react";
import dayjs from "dayjs";
import { type DateRange } from "react-day-picker";
import { toast } from "sonner";

import { PageHeading } from "@/components/PageHeading";
import { DateRangePicker } from "@/components/pickers/DateRangePicker";
import { SummaryCard } from "@/features/dashboard/components/SummaryCard";
import { RevenueOverviewChart } from "@/features/dashboard/components/RevenueOverviewChart";
import { SalesByCategoryChart } from "@/features/dashboard/components/SalesByCategoryChart";
import { RecentOrdersTable } from "@/features/dashboard/components/RecentOrdersTable";
import { TopProducts } from "@/features/dashboard/components/TopProducts";
import {
  useDashboardRecentOrders,
  useDashboardRevenue,
  useDashboardSummary,
  useDashboardTopProducts,
  useDashboardTopSalesCategory,
} from "@/features/dashboard/queries";
import { formatCurrency } from "@/utils/currency";
import { FilterParams } from "@/features/dashboard/types";

const DEFAULT_FILTER: FilterParams = {
  from: dayjs().startOf("month").format("YYYY-MM-DD"),
  to: dayjs().format("YYYY-MM-DD"),
};

export default function AdminDashboardPage() {
  const [filter, setFilter] = useState<FilterParams>(DEFAULT_FILTER);
  const hasShownErrorToast = useRef(false);

  const summary = useDashboardSummary(filter);
  const revenue = useDashboardRevenue(filter);
  const topSalesCategory = useDashboardTopSalesCategory(filter);
  const topProducts = useDashboardTopProducts(filter);
  const recentOrders = useDashboardRecentOrders();

  useEffect(() => {
    const hasError =
      summary.isError ||
      revenue.isError ||
      topSalesCategory.isError ||
      topProducts.isError ||
      recentOrders.isError;

    if (hasError && !hasShownErrorToast.current) {
      toast.error("Failed to load dashboard data");
      hasShownErrorToast.current = true;
    } else if (!hasError) {
      hasShownErrorToast.current = false;
    }
  }, [
    summary.isError,
    revenue.isError,
    topSalesCategory.isError,
    topProducts.isError,
    recentOrders.isError,
  ]);

  const handleRangeSelected = useCallback((range: DateRange) => {
    setFilter((prev) => {
      const next = {
        from: range.from ? dayjs(range.from).format("YYYY-MM-DD") : undefined,
        to: range.to ? dayjs(range.to).format("YYYY-MM-DD") : undefined,
      };

      if (prev.from === next.from && prev.to === next.to) return prev;
      return next;
    });
  }, []);

  return (
    <>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-6 sm:gap-0">
        <div>
          <PageHeading className="mb-2 sm:mb-3">Hi, Welcome back!</PageHeading>
          <p className="text-muted-foreground text-sm">
            Here&apos;s what&apos;s happening with your store
          </p>
        </div>

        <DateRangePicker onRangeSelected={handleRangeSelected} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <SummaryCard
          title="Total revenue"
          value={`${formatCurrency(summary.data?.totalRevenue ?? 0)} VND`}
          icon={Banknote}
          isLoading={summary.isLoading}
        />

        <SummaryCard
          title="Total orders"
          value={summary.data?.totalOrders ?? 0}
          icon={ShoppingCart}
          isLoading={summary.isLoading}
        />

        <SummaryCard
          title="Low stock products"
          value={summary.data?.lowStockProducts ?? 0}
          icon={TriangleAlert}
          isLoading={summary.isLoading}
          iconVariant="destructive"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mb-6">
        <div className="lg:col-span-3">
          <RevenueOverviewChart data={revenue.data ?? []} />
        </div>

        <div className="lg:col-span-2">
          <SalesByCategoryChart data={topSalesCategory.data ?? []} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <div className="lg:col-span-3">
          <RecentOrdersTable
            data={recentOrders.data ?? []}
            loading={recentOrders.isLoading}
          />
        </div>

        <div className="lg:col-span-2">
          <TopProducts
            data={topProducts.data ?? []}
            loading={topProducts.isLoading}
          />
        </div>
      </div>
    </>
  );
}
