import { UserRoles } from "@/enums";

export interface User {
  id: string;
  email: string;
  phone: string | null;
  fullName: string;
  avatarUrl: string | null;
  role: UserRoles;
  lastLogin: string;
  isActive: boolean;
  createdAt: string;
  createdBy: string | null;
  updatedAt: string | null;
  updatedBy: string | null;
}
