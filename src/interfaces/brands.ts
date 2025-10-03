export interface Brand {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  websiteUrl: string | null;
  logoUrl: string | null;
  isActive: boolean;
  createdAt: string;
  createdBy: string;
  updatedAt: string | null;
  updatedBy: string | null;
}

export interface CreateBrandRequest {
  name: string;
  slug: string;
  description?: string;
  logo?: File;
  websiteUrl?: string;
}

export type UpdateBrandRequest = Partial<CreateBrandRequest> & {
  removeLogo?: boolean;
};
