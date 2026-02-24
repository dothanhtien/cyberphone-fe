import * as z from "zod";

export const productVariantSchema = z
  .object({
    name: z
      .string()
      .min(1, "Name is required")
      .max(255, "Name must be less than 255 characters"),
    sku: z
      .string()
      .min(1, "SKU is required")
      .max(100, "SKU must be less than 100 characters"),
    price: z
      .number("Price must be a number")
      .min(0, "Price must be greater than or equal to 0"),
    salePrice: z
      .number("Sale price must be a number")
      .min(0, "Sale price must be greater than or equal to 0")
      .nullable()
      .optional()
      .or(z.literal(NaN).transform(() => null)),
    costPrice: z
      .number("Cost price must be a number")
      .min(0, "Cost price must be greater than or equal to 0")
      .nullable()
      .optional()
      .or(z.literal(NaN).transform(() => null)),
    stockQuantity: z
      .number("Stock quantity must be a number")
      .int("Stock quantity must be an integer")
      .min(0),
    lowStockThreshold: z
      .number("Low stock threshold must be a number")
      .int("Low stock threshold must be an integer")
      .min(0),
    isDefault: z.boolean(),
  })
  .refine(
    (data) => {
      if (data.salePrice == null) return true;
      return data.salePrice <= data.price;
    },
    {
      message: "Sale price must be less than or equal to price",
      path: ["salePrice"],
    },
  );

export type ProductVariantFormValues = z.infer<typeof productVariantSchema>;
