import { computed, effect, inject, Injectable, OnDestroy, signal } from "@angular/core";
import { FilterRangeValue } from "@shared/models";
import { DatesHandlerService, GlobalToastHandlerService, TableFiltersQueryParamHandlerService } from "@shared/services";
import { BillingsFiltersViewModel, BillingsQueryFacade } from "@states/billings-query";
import { BillingsDeleteFacade } from "@states/billings-delete";
import { TableLazyLoadEvent } from "primeng/table";

@Injectable()
export class BillingsQueryPageFacadeService implements OnDestroy{
  private readonly billingQueryFacade = inject(BillingsQueryFacade);
  private readonly billingsDeleteFacade = inject(BillingsDeleteFacade);
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
    return this.billingQueryFacade.isLoading() || this.billingsDeleteFacade.isLoading(); 
  });

  amountRange = signal<[number | null, number | null]>([null, null]);

  private readonly deleteSuccessEffect = this.buildDeleteSuccessEffect();
  private readonly deleteErrorEffect = this.buildDeleteErrorEffect();

  init(): void {
    this.billingQueryFacade.init();
    this.billingsDeleteFacade.init();
  }

  ngOnDestroy(): void {
    this.billingQueryFacade.init();
    this.billingsDeleteFacade.init();
  }

  private buildDeleteSuccessEffect() {
    return effect(() => {
      const isSuccess = this.billingsDeleteFacade.success();

      if (!isSuccess) return;
      this.globalToastHandlerService.showSuccess({ message: 'Se elimino la facturación correctamente'});
      this.search(this.lazyLoadEvent());
    });
  }

  private buildDeleteErrorEffect() {
    return effect(() => {
      const hasError = this.billingsDeleteFacade.error() != undefined;

      if (!hasError) return;
      this.globalToastHandlerService.showError({ message: 'No se pudo eliminar la facturación'});
    });
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

  delete(billingId?: number) : void {
    
    if (!billingId) {
      this.globalToastHandlerService.showError({ message: "La facturación seleccionada no contiene un id válido" });
      return;
    }

    this.billingsDeleteFacade.delete(billingId);
  }
}