export enum PaymentProvider {
  COD = "cod",
  BANK_TRANSFER = "bank_transfer",
  MOMO = "momo",
  ZALOPAY = "zalopay",
}

export enum OrderStatus {
  PENDING = "pending",
  CONFIRMED = "confirmed",
  PROCESSING = "processing",
  SHIPPING = "shipping",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}
