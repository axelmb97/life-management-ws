import { Injectable } from "@angular/core";
import { TableFilterValuesModel } from "@shared/models";
import { FilterMetadata } from "primeng/api";
import { TableLazyLoadEvent } from "primeng/table";

@Injectable({
  providedIn: 'root'
})
export class TableFiltersQueryParamHandlerService {

  getFixedFilters(event: TableLazyLoadEvent): TableFilterValuesModel {
    const dynamicValues = this.buildDynamicValues(event.filters);
    
    return {
      page: (event.first! / event.rows! + 1) ? (event.first! / event.rows! + 1) : 1,
      pageSize: event.rows ?? undefined,
      ...dynamicValues
    } as TableFilterValuesModel;
  }

  private buildDynamicValues(filters?: {[s: string]: FilterMetadata | FilterMetadata[] | undefined;}) {
    if (!filters) return {};
    const params: any = {};

    Object.keys(filters).forEach((key) => {
      const paramValue = filters[key];

      if (!paramValue) return;
      if (Array.isArray(paramValue) && paramValue.length == 0) return;
      
      if (Array.isArray(paramValue) && paramValue[0].value == null) return;

      if (Array.isArray(paramValue) && paramValue[0].value != null) {
        params[key] = paramValue[0].value;
        return;
      }

    if (key == "global" && !Array.isArray(paramValue) && paramValue?.value != null) {
        params["query"] = paramValue?.value;
        return;
      }
      
      return;
      
    });

    return params;
  }
}