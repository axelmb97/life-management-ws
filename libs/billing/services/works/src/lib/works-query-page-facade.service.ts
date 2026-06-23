import { computed, effect, inject, Injectable, signal } from "@angular/core";
import { TableLazyLoadEvent } from "primeng/table";

import { WorkFiltersViewModel, WorksQueryFacade } from "@states/works-query";
import { WorksDeleteFacade } from "@states/works-delete";
import { GlobalToastHandlerService, TableFiltersQueryParamHandlerService } from "@shared/services"

@Injectable()
export class WorksQueryPageFacadeService {
  private readonly worksQueryFacade = inject(WorksQueryFacade);
  private readonly worksDeleteFacade = inject(WorksDeleteFacade);
  private readonly tableFilterValuesService = inject(TableFiltersQueryParamHandlerService);
  private readonly globalToastHandlerService = inject(GlobalToastHandlerService);

  works = this.worksQueryFacade.works;
  pagination = this.worksQueryFacade.pagination;
  
  lazyLoadEvent = signal<TableLazyLoadEvent>({
    first: 0,
    rows: 10,
    sortField: undefined,
    sortOrder: undefined,
    filters: undefined,
  });

  private readonly deleteSuccessEffect = this.buildDeleteSuccessEffect();
  private readonly deleteErrorEffect = this.buildDeleteErrorEffect();

  areWorksLoading = computed(() => {
    return this.worksQueryFacade.isLoading() || this.worksDeleteFacade.isLoading(); 
  });
  
  init(): void {
    this.worksQueryFacade.init();
  }

  private buildDeleteSuccessEffect() {
    return effect(() => {
      const isSuccess = this.worksDeleteFacade.success();

      if (!isSuccess) return;
      this.globalToastHandlerService.showSuccess({ message: 'Se elimino el trabajo correctamente'});
      this.search(this.lazyLoadEvent());
    });
  }

  private buildDeleteErrorEffect() {
    return effect(() => {
      const hasError = this.worksDeleteFacade.error() != undefined;

      if (!hasError) return;
      this.globalToastHandlerService.showError({ message: 'No se pudo eliminar el trabajo'});
    });
  }

  search(event: TableLazyLoadEvent): void {
    this.lazyLoadEvent.set(event);

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

  delete(workId?: number){

    if (!workId) {
      this.globalToastHandlerService.showError({ message: "El trabajo seleccionado no contiene un id valido" });
      return;
    }

    this.worksDeleteFacade.delete(workId);
  }
}