import { PaginationHeadersViewModel } from "@data-access/models";
import { WorkViewModel } from "@data-access/models";

export interface WorksQueryState {
  works: WorkViewModel[];
  error: any | undefined;
  isLoading: boolean;
  isLoaded: boolean;
  pagination: PaginationHeadersViewModel | undefined;
} 