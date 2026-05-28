export interface PaginationHeadersViewModel {
  total: number | null;
  totalPages: number | null;
  firstPage: number | null;
  lastPage: number | null;
  page: number | null;
  nextPage: number | null;
  pageSize: number | null;
  previousPage: number | null;
}