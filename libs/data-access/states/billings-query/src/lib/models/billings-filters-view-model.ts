export interface BillingsFiltersViewModel {
  page?: number;
  pageSize?: number;
  order?: string;
  ids?: Array<string>;
  name?: string;
  observations?: string;
  query?: string;
  workName?: string;
  receptionDateFrom?: Date;
  receptionDateTo?: Date;
  amountFrom?: number;
  amountTo?: number;
}