import * as z from "zod";

import { Gender } from "@/enums";

export const updateProfileSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .max(255, "First name must be at most 255 characters"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .max(255, "Last name must be at most 255 characters"),
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
  dateOfBirth: z
    .date()
    .refine((d) => d <= new Date(), "Date of birth cannot be in the future")
    .optional()
    .nullable(),
  gender: z.enum(Gender).optional().nullable(),
  currentPassword: z.string().optional(),
  newPassword: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .optional()
    .or(z.literal("")),
  newPasswordConfirmation: z.string().optional().or(z.literal("")),
}).superRefine((data, ctx) => {
  if (data.newPassword) {
    if (!data.currentPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Current password is required",
        path: ["currentPassword"],
      });
    }
    if (data.newPasswordConfirmation !== data.newPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Passwords do not match",
        path: ["newPasswordConfirmation"],
      });
    }
  }
});

export type UpdateProfileFormValues = z.infer<typeof updateProfileSchema>;
