export enum UserRoles {
  ADMIN = "admin",
  MANAGER = "manager",
  SALE = "sale",
  CUSTOMER = "customer",
}

export interface User {
  id: string;
  email: string;
  phone: string | null;
  fullName: string;
  avatarUrl: string | null;
  role: UserRoles;
  lastLogin: string | null;
  isActive: boolean;
  createdAt: string;
  createdBy: string | null;
  updatedAt: string;
  updatedBy: string | null;
}
