import { Gender } from "@/enums";

export interface Customer {
  id: string;
  email: string;
  phone: string | null;
  firstName: string;
  lastName: string;
  dateOfBirth: string | null;
  gender: Gender | null;
  lastLogin: string | null;
  emailVerified: boolean;
  phoneVerified: boolean;
  isActive: boolean;
  createdAt: string;
}

export interface UpdateCustomerRequest {
  email?: string;
  phone?: string | null;
  firstName?: string;
  lastName?: string;
  dateOfBirth?: string | null;
  gender?: Gender | null;
}
