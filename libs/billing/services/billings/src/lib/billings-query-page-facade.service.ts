import { computed, inject, Injectable, OnDestroy, signal } from "@angular/core";
import { FilterRangeValue } from "@shared/models";
import { DatesHandlerService, GlobalToastHandlerService, TableFiltersQueryParamHandlerService } from "@shared/services";
import { BillingsFiltersViewModel, BillingsQueryFacade } from "@states/billings-query";

import { TableLazyLoadEvent } from "primeng/table";

@Injectable()
export class BillingsQueryPageFacadeService implements OnDestroy{
  private readonly billingQueryFacade = inject(BillingsQueryFacade);
  // private readonly worksDeleteFacade = inject(WorksDeleteFacade);
  private readonly tableFilterValuesService = inject(TableFiltersQueryParamHandlerService);
  private readonly globalToastHandlerService = inject(GlobalToastHandlerService);
  private readonly datesHandlerService = inject(DatesHandlerService);

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

  amountRange = signal<[number | null, number | null]>([null, null]);


  init(): void {
    this.billingQueryFacade.init();
    // this.worksDeleteFacade.init();
  }

  ngOnDestroy(): void {
    this.billingQueryFacade.init();
    // this.worksDeleteFacade.init();
  }

  setAmountRangeValue(index: number, amount: number | null) : void {
    if (index == FilterRangeValue.From) {
      this.amountRange.set([amount, this.amountRange()[1]]);
      return;
    }

    if (index == FilterRangeValue.To) {
      this.amountRange.set([this.amountRange()[0], amount]);
      return;
    }
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
      amountFrom: normalizedValues['amount'] != undefined && normalizedValues['amount'][0] != null  
                  ? Number(normalizedValues['amount'][0]) : undefined,
      amountTo: normalizedValues['amount'] != undefined && normalizedValues['amount'][1] != null  
                ? Number(normalizedValues['amount'][1]) : undefined,
      receptionDateFrom: normalizedValues['receptionDate'] != undefined 
                          &&  normalizedValues['receptionDate'][0] != null  
                          ? this.datesHandlerService.convertFromDateISO(normalizedValues['receptionDate'][0])
                          : undefined,
      receptionDateTo: normalizedValues['receptionDate'] != undefined
                        &&  normalizedValues['receptionDate'][1] != null  
                              ? this.datesHandlerService.convertToDateISO(normalizedValues['receptionDate'][1])
                              : undefined

    };
    
    this.billingQueryFacade.getWorksByFilters(filters);
  }
}