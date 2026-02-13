import * as z from "zod";
import { ProductImageType, ProductStatus } from "./enums";

export const productImageMetaSchema = z.object({
  imageType: z.enum(ProductImageType),
  altText: z
    .string("altText must be a string")
    .max(255, {
      message: "altText must not exceed 255 characters",
    })
    .nullable()
    .optional(),
  title: z
    .string("title must be a string")
    .max(255, {
      message: "title must not exceed 255 characters",
    })
    .nullable()
    .optional(),
  displayOrder: z
    .number("displayOrder must be an integer")
    .int({ message: "displayOrder must be an integer" })
    .min(0, {
      message: "displayOrder must be greater than or equal to 0",
    })
    .optional(),
});

export const createProductSchema = z
  .object({
    name: z
      .string()
      .min(1, "Product name is required")
      .max(255, "Product name must be less than 255 characters"),
    slug: z
      .string()
      .min(1, "Slug is required")
      .max(255)
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug is invalid"),
    brandId: z.uuid("Brand is invalid"),
    categoryIds: z
      .array(z.uuid("Categories are invalid"))
      .min(1, "At least one category is required"),
    shortDescription: z.string().max(1000).optional().or(z.literal("")),
    longDescription: z.string().optional().or(z.literal("")),
    status: z.enum(ProductStatus),
    isFeatured: z.boolean(),
    isBestseller: z.boolean(),
    images: z.array(z.instanceof(File)).default([]),
    mainImage: z.instanceof(File).optional(),
    imageMetas: z.array(productImageMetaSchema).default([]),
  })
  .refine(
    (data) => {
      if (!data.images || !data.imageMetas) return true;
      return data.images.length === data.imageMetas.length;
    },
    {
      message: "Images and imageMetas must have the same length",
      path: ["imageMetas"],
    },
  );

export type CreateProductFormValues = z.infer<typeof createProductSchema>;
