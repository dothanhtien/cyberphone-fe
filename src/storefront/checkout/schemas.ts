import * as z from "zod";

export const addressSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  phone: z
    .string()
    .min(9, "Phone must be at least 9 digits")
    .regex(/^[0-9+]+$/, "Invalid phone number"),
  email: z.email("Email address is invalid").optional().or(z.literal("")),
  line1: z.string().min(1, "Address is required"),
  city: z.string().min(1, "City is required"),
  district: z.string().min(1, "State/District is required"),
  postalCode: z.string().optional(),
  country: z.string().min(1, "Country is required"),
});

export type AddressFormValues = z.infer<typeof addressSchema>;
