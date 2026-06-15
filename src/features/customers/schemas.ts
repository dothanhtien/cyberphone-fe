import * as z from "zod";
import { Gender } from "@/enums";

export const updateCustomerSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .max(320, "Email must be at most 320 characters")
    .email("Email is invalid"),
  phone: z
    .string()
    .regex(
      /^\+?(?=[\d\s-]*\d)[\d\s-]{8,20}$/,
      "Phone must be 8–20 characters, contain at least one digit, and use only digits, spaces, or dashes (optional leading +)",
    )
    .optional()
    .or(z.literal("")),
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(255, "First name must be at most 255 characters"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(255, "Last name must be at most 255 characters"),
  dateOfBirth: z
    .date()
    .refine((d) => d <= new Date(), "Date of birth cannot be in the future")
    .optional()
    .nullable(),
  gender: z.enum(Gender).optional().nullable(),
});

export type UpdateCustomerFormValues = z.infer<typeof updateCustomerSchema>;
