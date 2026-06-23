import { computed, inject, Injectable, signal } from "@angular/core";
import { WorksDeleteIdMapper, WorksDeleteState } from "./models";
import { WorksBillingService } from "@data-access/apis/billing-api";
import { finalize } from "rxjs";

@Injectable()
export class WorksDeleteFacade {
  private readonly worksBillingService = inject(WorksBillingService);

  private readonly worksDeleteState = signal<WorksDeleteState>({
    isLoading: false,
    error: undefined,
    success: false,
  });

  readonly isLoading = computed(() => this.worksDeleteState().isLoading);
  readonly error = computed(() => this.worksDeleteState().error);
  readonly success = computed(() => this.worksDeleteState().success);

  init(): void {
    this.initState();
  }
  
  private initState(): void {
    this.worksDeleteState.set({
      isLoading: false,
      error: undefined,
      success: false,
    });
  }

  
  delete(workId?: number): void {

    if (!workId){
      this.worksDeleteState.update(state => ({...state, error: 'No hay un id de trabajo seleccionado'}));
      return;
    }
    
    this.setIsLoading(true);
    const workData = WorksDeleteIdMapper.toDomain(workId);

    this.worksBillingService.apiWorksIdDelete(workData)
    .pipe(
      finalize(() => this.setIsLoading(false))
    )
    .subscribe({
      next: () => {
        this.worksDeleteState.update(state => ({
          ...state,
          success: true,
          error: undefined,
        }));
      },
      error: (error) => {
        this.worksDeleteState.update(state => ({
          ...state,
          error: error.message,
          success: false,
        }));
      }
    });
  }

  private setIsLoading(isLoading: boolean): void {
    this.worksDeleteState.update(state => ({
      ...state,
      isLoading: isLoading,
    }));
  }
}