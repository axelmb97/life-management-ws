import { PaginationHeadersViewModel } from "@data-access/models";
import { BillingViewModel } from "@data-access/models";

export interface BillingsQueryState {
  billings: BillingViewModel[];
  error: any | undefined;
  isLoading: boolean;
  pagination: PaginationHeadersViewModel | undefined;
} 