import { OrderStatus, PaymentMethod, PaymentStatus } from "@/enums";

export interface Order {
  id: string;
  code: string;
  customer: {
    id: string;
    firstName: string;
    lastName: string;
  } | null;
  orderTotal: string;
  orderStatus: OrderStatus;
  paymentStatus: PaymentStatus;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItemAttribute {
  key: string;
  displayKey: string | null;
  value: string;
  displayValue: string | null;
}

export interface OrderItem {
  id: string;
  variantName: string;
  sku: string;
  attributes: OrderItemAttribute[];
  quantity: number;
  unitPrice: string;
  salePrice: string;
  itemTotal: string;
}

export interface OrderDetails {
  id: string;
  code: string;
  customer: {
    id: string;
    phone: string;
    email: string | null;
    firstName: string;
    lastName: string;
  } | null;
  shipping: {
    name: string;
    phone: string;
    email: string | null;
    line1: string;
    line2: string | null;
    city: string;
    state: string | null;
    district: string;
    ward: string;
    postalCode: string | null;
    country: string;
    note: string | null;
    method: string;
    fee: string;
    total: string;
  };
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  itemsTotal: string;
  discountTotal: string;
  taxTotal: string;
  orderTotal: string;
  orderStatus: OrderStatus;
  items: OrderItem[];
}
