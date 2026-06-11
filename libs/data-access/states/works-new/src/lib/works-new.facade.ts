import { computed, inject, Injectable, signal } from "@angular/core";
import { WorksBillingService } from "@data-access/apis/billing-api";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { finalize } from "rxjs";
import { WorkNewForm, WorksNewState, WorksNewFormMapper } from "./models";

@Injectable()
export class WorksNewFacade {
  private readonly worksBillingService = inject(WorksBillingService);
  private readonly builder = inject(FormBuilder);
  private readonly formInitialization: FormGroup<WorkNewForm> = this.builder.group({
    name: ["", [Validators.required]],
    observations: ["", [Validators.required]]
  });

  private readonly worksNewState = signal<WorksNewState>({
    isLoading: false,
    error: undefined,
    success: false,
    form: this.formInitialization
  });

  readonly form = computed(() => this.worksNewState().form);
  readonly isLoading = computed(() => this.worksNewState().isLoading);
  readonly error = computed(() => this.worksNewState().error);
  readonly success = computed(() => this.worksNewState().success);

  init(): void {
    this.initState();
  }
  
  private initState(): void {
    this.worksNewState.set({
      isLoading: false,
      error: undefined,
      success: false,
      form: this.formInitialization
    });
  }

  save(): void {
    this.setIsLoading(true);
    const work = WorksNewFormMapper.toDomain(this.worksNewState().form);

    this.worksBillingService.apiWorksPost(work)
    .pipe(
      finalize(() => this.setIsLoading(false))
    )
    .subscribe({
      next: () => {
        this.worksNewState.update(state => ({
          ...state,
          success: true,
          error: undefined,
        }));
      },
      error: (error) => {
        this.worksNewState.update(state => ({
          ...state,
          error: error.message,
          success: false,
        }));
      }
    });
  }

  private setIsLoading(isLoading: boolean): void {
    this.worksNewState.update(state => ({
      ...state,
      isLoading: isLoading
    }));
  }
}