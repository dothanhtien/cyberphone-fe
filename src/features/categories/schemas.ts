import * as z from "zod";

export const createCategorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
  slug: z.string().min(1, "Slug is required"),
  parentId: z.string().optional(),
  description: z.string().optional(),
  logo: z.instanceof(File).optional(),
  removeLogo: z.boolean().optional(),
});

export type CreateCategoryFormValues = z.infer<typeof createCategorySchema>;
