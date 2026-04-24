export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  parentId: string | null;
  logo: string | null;
  productCount: number;
}

export interface CreateCategoryRequest {
  id?: string;
  name: string;
  slug: string;
  parentId?: string | null;
  description?: string | null;
  logo?: File;
}

export interface UpdateCategoryRequest {
  name?: string;
  slug?: string;
  parentId?: string | null;
  description?: string | null;
  logo?: File | null;
  removeLogo?: boolean;
}
