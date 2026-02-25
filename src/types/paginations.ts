export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface StorefrontPaginationParams extends PaginationParams {
  search?: string;
  sort?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  totalCount: number;
  currentPage: number;
  itemsPerPage: number;
}
