export interface FilterParams {
  from?: string;
  to?: string;
}

export interface DashboardSummary {
  totalRevenue: number;
  totalOrders: number;
  lowStockProducts: number;
}

export interface DashboardRevenue {
  date: string;
  revenue: string;
}

export interface SalesByCategory {
  category: string;
  total: number;
}

export interface TopProduct {
  id: string;
  name: string;
  totalSales: number;
  imageUrl: string | null;
}

export interface RecentOrder {
  id: string;
  code: string;
  totalAmount: number;
  orderStatus: string;
}
