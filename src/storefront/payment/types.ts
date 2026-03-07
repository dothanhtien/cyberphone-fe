export interface CreatePaymentRequest {
  orderId: string;
  provider: string;
  redirectUrl: string;
}

export interface StorefrontPayment {
  id: string;
  status: string;
  orderCode: string;
}
