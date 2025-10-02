export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  logoUrl: string | null;
  parentId: string | null;
  parent: Category | null;
  isActive: boolean;
  createdAt: string;
  createdBy: string;
  updatedAt: string | null;
  updatedBy: string | null;
}
