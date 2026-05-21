import { WorkViewModel } from "./work-view-model";

export interface WorksQueryState {
  works: WorkViewModel[];
  filters: { page: number };
  error: any | undefined;
  isLoading: boolean;
}