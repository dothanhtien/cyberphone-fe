export interface CreateOrderRequest {
  cartId: string;
  shippingName: string;
  shippingPhone: string;
  shippingAddressLine1: string;
  shippingCity: string;
  shippingDistrict: string;
  shippingWard: string;
  paymentMethod: string;
  shippingMethod: string;
}
