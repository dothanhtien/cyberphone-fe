export interface User {
  id: string;
  phone: string;
  email: string | null;
  fullName: string;
  lastLogin: string | null;
  isActive: boolean;
  roleId: string;
  createdAt: string;
  createdBy: string;
  updatedAt: string | null;
  updatedBy: string | null;
}
