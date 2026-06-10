import { WorkViewModel } from "./work-view-model";
import { PaginationHeadersViewModel } from "@shared/models";

export interface WorksQueryState {
  works: WorkViewModel[];
  filters: { page: number };
  error: any | undefined;
  isLoading: boolean;
  isLoaded: boolean;
  pagination: PaginationHeadersViewModel | undefined;
} 