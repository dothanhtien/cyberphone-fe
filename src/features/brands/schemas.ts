import * as z from "zod";

export const createBrandSchema = z.object({
  name: z.string().min(1, "Brand name is required"),
  slug: z.string().min(1, "Slug is required"),
  description: z.string().optional(),
  logo: z.instanceof(File).optional(),
});

export type CreateBrandFormValues = z.infer<typeof createBrandSchema>;
