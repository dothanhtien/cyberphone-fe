export enum PaymentProvider {
  COD = "cod",
  BANK_TRANSFER = "bank_transfer",
  MOMO = "momo",
  ZALOPAY = "zalopay",
}

export enum PaymentMethod {
  MOMO = "momo",
}

export enum PaymentStatus {
  PENDING = "pending",
  SUCCESS = "success",
  FAILED = "failed",
  CANCELLED = "cancelled",
}

export enum OrderStatus {
  PENDING = "pending",
  CONFIRMED = "confirmed",
  PROCESSING = "processing",
  SHIPPING = "shipping",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
}

export enum Gender {
  MALE = "male",
  FEMALE = "female",
  OTHER = "other",
}
