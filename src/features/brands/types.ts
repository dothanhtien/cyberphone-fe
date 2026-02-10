export interface Brand {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  websiteUrl: string | null;
  isActive: boolean;
  createdAt: string;
  createdBy: string;
  updatedAt: string | null;
  updatedBy: string | null;
  logo: string | null;
}

export interface CreateBrandRequest {
  name: string;
  slug: string;
  description?: string | null;
  logo?: File;
}
