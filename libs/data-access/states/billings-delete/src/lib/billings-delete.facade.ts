import { computed, inject, Injectable, signal } from "@angular/core";
import { BillingsDeleteIdMapper, BillingsDeleteState } from "./models";
import { finalize, map } from "rxjs";
import { BillingsBillingService } from "@data-access/apis/billing-api";

@Injectable()
export class BillingsDeleteFacade {
  private readonly billingsBillingService = inject(BillingsBillingService);

  private readonly billingsDeleteState = signal<BillingsDeleteState>({
    isLoading: false,
    error: undefined,
    success: false,
  });

  readonly isLoading = computed(() => this.billingsDeleteState().isLoading);
  readonly error = computed(() => this.billingsDeleteState().error);
  readonly success = computed(() => this.billingsDeleteState().success);

  init(): void {
    this.initState();
  }
  
  private initState(): void {
    this.billingsDeleteState.set({
      isLoading: false,
      error: undefined,
      success: false,
    });
  }

  
  delete(billingId?: number): void {

    if (!billingId){
      this.billingsDeleteState.update(state => ({...state, error: 'No hay un id de facturación seleccionado'}));
      return;
    }
    
    this.setIsLoading(true);
    const billinData = BillingsDeleteIdMapper.toDomain(billingId);

    this.billingsBillingService.apiBillingsIdDelete(billinData)
    .pipe(
      map((response) => {
        if (!response) throw new Error("No se pudo eliminar la facturación seleccionada");
        return response;
      }),
      finalize(() => this.setIsLoading(false))
    )
    .subscribe({
      next: () => {
        this.billingsDeleteState.update(state => ({
          ...state,
          success: true,
          error: undefined,
        }));
      },
      error: (error) => {
        this.billingsDeleteState.update(state => ({
          ...state,
          error: error.message,
          success: false,
        }));
      }
    });
  }

  private setIsLoading(isLoading: boolean): void {
    this.billingsDeleteState.update(state => ({
      ...state,
      isLoading: isLoading,
    }));
  }
}