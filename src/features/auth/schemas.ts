import * as z from "zod";
import { Gender } from "@/enums";

export const registerSchema = z
  .object({
    phone: z
      .string()
      .min(1, "Phone is required")
      .max(30, "Phone must be at most 30 characters")
      .regex(/^[0-9\s-]+$/, "Phone can only contain numbers, spaces, and '-'"),
    email: z.email("Email is invalid").optional().or(z.literal("")),
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
