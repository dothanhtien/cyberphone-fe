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
  ward: z.string().min(1, "Ward is required"),
  district: z.string().min(1, "District is required"),
  city: z.string().min(1, "City is required"),
  postalCode: z.string().optional(),
});

export type AddressFormValues = z.infer<typeof addressSchema>;
