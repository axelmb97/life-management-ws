import { PaginationHeadersViewModel } from "@shared/models";
import { WorkViewModel } from "@data-access/models";

export interface WorksQueryState {
  works: WorkViewModel[];
  filters: { page: number };
  error: any | undefined;
  isLoading: boolean;
  isLoaded: boolean;
  pagination: PaginationHeadersViewModel | undefined;
} 