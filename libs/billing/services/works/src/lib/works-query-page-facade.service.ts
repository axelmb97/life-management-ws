import { inject, Injectable, signal } from "@angular/core";
import { TableLazyLoadEvent } from "primeng/table";

import { WorkFiltersViewModel, WorksQueryFacade } from "@states/works-query";
import { GlobalToastHandlerService, TableFiltersQueryParamHandlerService } from "@shared/services"

@Injectable()
export class WorksQueryPageFacadeService {
  private readonly tableFilterValuesService = inject(TableFiltersQueryParamHandlerService);
  private readonly worksQueryFacade = inject(WorksQueryFacade);
  private readonly globalToastHandlerService = inject(GlobalToastHandlerService);

  works = this.worksQueryFacade.works;
  isLoading = this.worksQueryFacade.isLoading;
  isLoaded = this.worksQueryFacade.isLoaded;
  error = this.worksQueryFacade.error;
  pagination = this.worksQueryFacade.pagination;

  lazyLoadEvent = signal<TableLazyLoadEvent>({
    first: 0,
    rows: 10,
    sortField: undefined,
    sortOrder: undefined,
    filters: undefined,
  });
  
  init(): void {
    this.worksQueryFacade.init();
  }

  search(event: TableLazyLoadEvent): void {

    const normalizedValues = this.tableFilterValuesService.getFixedFilters(event);
    const filters: WorkFiltersViewModel = {   
      page: normalizedValues['page'] != undefined ? parseInt(normalizedValues['page']) : 0,
      pageSize: normalizedValues['pageSize'] != undefined ? parseInt(normalizedValues['pageSize']) : 10, 
      name: normalizedValues['name'] , 
      observations: normalizedValues['observations'],
      query: normalizedValues['query'],
      order: 'id desc'
    };
    
    this.worksQueryFacade.getWorksByFilters(filters);
  }

  delete(id?: number){

    if (!id) {
      this.globalToastHandlerService.showError({ message: "El trabajo seleccionado no contiene un id valido" });
      return;
    }

    //TODO: Agregar facade de WorkDeleteFacade
  }
}