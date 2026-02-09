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

export interface CreateCategoryRequest {
  name: string;
  slug: string;
  parentId?: string | null;
  description?: string | null;
  logo?: File;
}
