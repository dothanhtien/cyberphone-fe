export interface User {
  id: string;
  username: string;
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

export interface LoginRequest {
  identifier: string;
  password: string;
}

export interface LoginResponse {
  data: User;
  accessToken: string;
}
