import { computed, inject, Injectable, signal } from "@angular/core";
import { WorksBillingService } from "@data-access/apis/billing-api";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { finalize } from "rxjs";
import {  WorksNewState, WorksNewFormMapper, WorkNewForm } from "./models";
import { FormErrorList } from "@data-access/models";

@Injectable()
export class WorksNewFacade {
  private readonly worksBillingService = inject(WorksBillingService);
  private readonly builder = inject(FormBuilder);

  private readonly worksNewState = signal<WorksNewState>({
    isLoading: false,
    error: undefined,
    success: false,
    form: this.buildForm(),
    formErros: this.buildFormErrors()
  });

  readonly form = computed(() => this.worksNewState().form);
  readonly formErrors = computed(() => this.worksNewState().formErros);
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
      form: this.buildForm(),
      formErros: this.buildFormErrors()
    });
  }

  private buildFormErrors(): Record<string, FormErrorList> {
    return {
      name: {
        required: 'El nombre es obligatorio',
        minlength: 'El nombre debe tener al meno 3 caracteres',
        maxlength: 'El nombre no puede tener mas de 50 caracteres'
      },
      observations: {
        required: 'La observación es obligatoria',
        minlength: 'La observación debe tener al menos 3 caracteres',
        maxlength: 'La observación no puede tener mas de 100 caracteres'
      }
    };
  }

  private buildForm() : FormGroup<WorkNewForm> {
    return this.builder.group({
      name: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      observations: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(100)]]
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