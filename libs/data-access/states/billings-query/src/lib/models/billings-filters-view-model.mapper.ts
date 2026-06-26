import { ApiBillingsGetRequestParams } from "@data-access/apis/billing-api";
import { BillingsFiltersViewModel } from "./billings-filters-view-model";

export class BillingsFiltersViewModelMapper {
  static toDomain(filters: BillingsFiltersViewModel): ApiBillingsGetRequestParams {
    return {
      page: filters.page,
      pageSize: filters.pageSize,
      order: filters.order,
      ids: filters.ids,
      queryValue: filters.query,
      name: filters.name,
      observations: filters.observations,
      workName: filters.workName,
      receptionDateFrom: filters.receptionDateFrom,
      receptionDateTo: filters.receptionDateTo,
      amountFrom: filters.amountFrom,
      amountTo: filters.amountTo
    };
  }
}