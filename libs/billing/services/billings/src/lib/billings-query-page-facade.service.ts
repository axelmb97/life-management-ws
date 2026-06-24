import { computed, inject, Injectable, OnDestroy, signal } from "@angular/core";
import { GlobalToastHandlerService, TableFiltersQueryParamHandlerService } from "@shared/services";
import { BillingsFiltersViewModel, BillingsQueryFacade } from "@states/billings-query";

import { TableLazyLoadEvent } from "primeng/table";

@Injectable()
export class WorksQueryPageFacadeService implements OnDestroy{
  private readonly billingQueryFacade = inject(BillingsQueryFacade);
  // private readonly worksDeleteFacade = inject(WorksDeleteFacade);
  private readonly tableFilterValuesService = inject(TableFiltersQueryParamHandlerService);
  private readonly globalToastHandlerService = inject(GlobalToastHandlerService);

  billings = this.billingQueryFacade.billings;
  pagination = this.billingQueryFacade.pagination;
  
  lazyLoadEvent = signal<TableLazyLoadEvent>({
    first: 0,
    rows: 10,
    sortField: undefined,
    sortOrder: undefined,
    filters: undefined,
  });

  areWorksLoading = computed(() => {
    return this.billingQueryFacade.isLoading(); 
  });

  init(): void {
    this.billingQueryFacade.init();
    // this.worksDeleteFacade.init();
  }

  ngOnDestroy(): void {
    this.billingQueryFacade.init();
    // this.worksDeleteFacade.init();
  }

  search(event: TableLazyLoadEvent): void {
    this.lazyLoadEvent.set(event);

    const normalizedValues = this.tableFilterValuesService.getFixedFilters(event);
    const filters: BillingsFiltersViewModel = {   
      page: normalizedValues['page'] != undefined ? parseInt(normalizedValues['page']) : 0,
      pageSize: normalizedValues['pageSize'] != undefined ? parseInt(normalizedValues['pageSize']) : 10, 
      name: normalizedValues['name'] , 
      observations: normalizedValues['observations'],
      query: normalizedValues['query'],
      order: 'id desc',
      workName: normalizedValues['workName'],
      //TODO: Faltan filtros de amount y reception date
    };
    
    this.billingQueryFacade.getWorksByFilters(filters);
  }
}