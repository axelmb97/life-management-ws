export interface BillingsFiltersViewModel {
  page?: number;
  pageSize?: number;
  order?: string;
  ids?: Array<string>;
  name?: string;
  observations?: string;
  query?: string;
  workName?: string;
  receptionDateFrom?: string;
  receptionDateTo?: string;
  amountFrom?: number;
  amountTo?: number;
}