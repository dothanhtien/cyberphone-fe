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

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  parentId: string | null;
  isActive: boolean;
  createdAt: string;
  createdBy: string;
  updatedAt: string | null;
  updatedBy: string | null;
  logo: string | null;
}

export interface LoginRequest {
  identifier: string;
  password: string;
}

export interface LoginResponse {
  data: User;
  accessToken: string;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface PaginatedResponse<T> {
  items: T[];
  totalCount: number;
  currentPage: number;
  itemsPerPage: number;
}
