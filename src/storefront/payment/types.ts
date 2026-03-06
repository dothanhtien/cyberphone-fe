export interface CreatePaymentRequest {
  orderId: string;
  provider: string;
  redirectUrl: string;
}
