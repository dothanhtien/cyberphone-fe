import * as z from "zod";

import { ProductImageType } from "@/features/products/enums";

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
      .min(0, "Stock quantity must be greater than or equal to 0"),
    lowStockThreshold: z
      .number("Low stock threshold must be a number")
      .int("Low stock threshold must be an integer")
      .min(0, "Low stock threshold must be greater than or equal to 0"),
    isDefault: z.boolean(),
    gallery: z
      .array(
        z.object({
          id: z.string(),
          file: z.instanceof(File).optional(),
          preview: z.string().optional().nullable(),
          isMain: z.boolean(),
          url: z.string().optional().nullable(),
          altText: z.string().optional(),
          isDeleted: z.boolean().optional(),
        }),
      )
      .optional(),
    images: z.array(z.instanceof(File)).default([]),
    imageMetas: z
      .array(
        z.object({
          id: z.string().optional(),
          imageType: z.nativeEnum(ProductImageType),
          altText: z.string().nullable().optional(),
          title: z.string().nullable().optional(),
          displayOrder: z.number().optional(),
          isDeleted: z.boolean().optional(),
        }),
      )
      .default([]),
    attributes: z.array(
      z.object({
        id: z.string().optional(),
        productAttributeId: z.string(),
        attributeValue: z.string().min(1, "Attribute value is required"),
        attributeValueDisplay: z.string().optional(),
      }),
    ),
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
