export interface Brand {
  id: string;
  name: string;
  slug: string;
  description?: string;
  websiteUrl?: string;
  isActive: boolean;
  createdAt: string;
  createdBy: string;
  updatedAt: string | null;
  updatedBy: string | null;
  logo: string | null;
  productCount: number;
}

export interface CreateBrandRequest {
  id?: string;
  name: string;
  slug: string;
  description?: string | null;
  logo?: File | null;
}

export type UpdateBrandRequest = Partial<CreateBrandRequest> & {
  removeLogo?: boolean;
};
