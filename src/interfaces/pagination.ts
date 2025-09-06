export type Paginated<T> = {
  items: T[];
  totalCount: number;
  currentPage: number;
  itemsPerPage: number;
};
