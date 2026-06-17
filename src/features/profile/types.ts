import { Gender } from "@/enums";

export interface Profile {
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

export interface UpdateProfileRequest {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string | null;
  dateOfBirth?: string | null;
  gender?: Gender | null;
  currentPassword?: string;
  newPassword?: string;
  newPasswordConfirmation?: string;
}
