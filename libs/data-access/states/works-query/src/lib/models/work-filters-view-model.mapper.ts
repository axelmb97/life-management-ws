import { ApiWorksGetRequestParams } from "@data-access/apis/billing-api";
import { WorkFiltersViewModel } from "./work-filters-view-model";

export class WorkFiltersViewModelMapper {
  static toDomain(filters: WorkFiltersViewModel): ApiWorksGetRequestParams {
    return {
      page: filters.page,
      pageSize: filters.pageSize,
      order: filters.order,
      ids: filters.ids,
    };
  }
}