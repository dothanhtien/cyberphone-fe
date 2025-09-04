export interface Brand {
  id: string;
  name: string;
  slug: string;
  description: string | undefined;
  websiteUrl: string | undefined;
  logoUrl: string | undefined;
  isActive: boolean;
  createdAt: string;
  createdBy: string;
  updatedAt: string | undefined;
  updatedBy: string | undefined;
}
