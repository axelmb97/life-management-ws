import { computed, inject, Injectable, signal } from "@angular/core";
import { BillingsFiltersViewModel, BillingsFiltersViewModelMapper, BillingsQueryState } from "./models";
import { BillingsBillingService } from "@data-access/apis/billing-api";
import { finalize, map } from "rxjs";
import { PaginationHeadersViewModel } from "@data-access/models";
import { BillingViewModel } from "@data-access/models";
import { BillingViewModelMapper } from "@data-access/mappers";

@Injectable()
export class BillingsQueryFacade {
  private readonly billingsBillingService = inject(BillingsBillingService);

  private readonly billingsQueryState = signal<BillingsQueryState>({
    billings: [],
    error: undefined,
    isLoading: false,
    pagination: undefined
  });

  readonly billings = computed(() => this.billingsQueryState().billings);
  readonly error = computed(() => this.billingsQueryState().error);
  readonly isLoading = computed(() => this.billingsQueryState().isLoading);
  readonly pagination = computed(() => this.billingsQueryState().pagination);

  init(): void {
    this.initState();
  }

  private initState() : void {
    this.billingsQueryState.set({
      billings: [],
      error: undefined,
      isLoading: false,
      pagination: undefined
    });
  }

  getWorksByFilters(filters: BillingsFiltersViewModel) : void {
    this.setIsLoading(true);
    const domainFilters = BillingsFiltersViewModelMapper.toDomain(filters);
    
    this.billingsBillingService.apiBillingsGet(domainFilters, 'response')
    .pipe(
      finalize(() =>  this.setIsLoading(false)),
      map((response) => {
        const header = response.headers.get('x-pagination');
        const jsonObj: unknown = JSON.parse(header!);
        const pagination: PaginationHeadersViewModel = <PaginationHeadersViewModel>jsonObj;

        return {
          billings: response.body?.map(c => BillingViewModelMapper.toModel(c)) ?? [] as BillingViewModel[],
          pagination: pagination
        };
      }),
    )
    .subscribe({
      next: ({billings, pagination}) => {
        this.billingsQueryState.update(state => ({
          ...state,
          error: undefined,
          billings: billings,
          pagination: pagination,
        }));
      },
      error: (error) => {
        this.billingsQueryState.update(state => ({
          ...state,
          billings: [],
          error: error,
          pagination: undefined,
        }));
      },
    });
  }

  private setIsLoading(isLoading: boolean) {
    this.billingsQueryState.update(state => ({
      ...state,
      isLoading
    }));
  }
}