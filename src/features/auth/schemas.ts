import * as z from "zod";
import { Gender } from "@/enums";

const emailSchema = z
  .string()
  .min(1, "Email is required")
  .max(320, "Email must be at most 320 characters")
  .email("Email is invalid");

export const forgotPasswordSchema = z.object({
  email: emailSchema,
});

export type ForgotPasswordFormValues = z.infer<typeof forgotPasswordSchema>;

export const registerSchema = z
  .object({
    email: emailSchema,
    phone: z
      .string()
      .max(30, "Phone must be at most 30 characters")
      .regex(/^[0-9\s-]*$/, "Phone can only contain numbers, spaces, and '-'")
      .refine((v) => !v || v.trim().length > 0, "Phone cannot be blank")
      .optional(),
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    dateOfBirth: z
      .date("Date of birth is required")
      .refine((date) => date <= new Date(), {
        message: "Date of birth cannot be in the future",
      }),
    gender: z.enum(Gender, "Gender is required"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(100, "Password must be at most 100 characters"),
    passwordConfirmation: z
      .string()
      .min(1, "Password confirmation is required"),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords do not match",
    path: ["passwordConfirmation"],
  });

export type RegisterFormValues = z.infer<typeof registerSchema>;
