import { computed, inject, Injectable, signal } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { WorksBillingService } from "@data-access/apis/billing-api";
import { WorksEditForm, WorksEditFormMapper, WorksEditState, WorksGetByIdFiltersmMapper } from "./models";
import { FormErrorList } from "@data-access/models";
import { finalize, map, tap } from "rxjs";
import { WorkViewModelMapper } from '@data-access/mappers';
import { WorkViewModel } from "@data-access/models";

@Injectable()
export class WorksEditFacade {
  private readonly worksBillingService = inject(WorksBillingService);
  private readonly builder = inject(FormBuilder);

  private readonly worksEditState = signal<WorksEditState>({
    isLoading: false,
    isLoaded: false,
    error: undefined,
    success: false,
    selectedWorkId: undefined,
    form: this.buildForm(),
    formErros: this.buildFormErrors()
  });

  readonly form = computed(() => this.worksEditState().form);
  readonly formErrors = computed(() => this.worksEditState().formErros);
  readonly isLoading = computed(() => this.worksEditState().isLoading);
  readonly isLoaded = computed(() => this.worksEditState().isLoaded);
  readonly error = computed(() => this.worksEditState().error);
  readonly success = computed(() => this.worksEditState().success);

  init(): void {
    this.initState();
  }
  
  private initState(): void {
    this.worksEditState.set({
      isLoading: false,
      isLoaded: false,
      error: undefined,
      success: false,
      selectedWorkId: undefined,
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

  private buildForm() : FormGroup<WorksEditForm> {
    return this.builder.group({
      name: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      observations: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(100)]]
    });
  }

  setSelectedWork(workId: number) {
    this.setIsLoading(true);
    const filters = WorksGetByIdFiltersmMapper.toDomain(workId);

    this.worksBillingService.apiWorksIdGet(filters)
    .pipe(
      map((response) => {
        return WorkViewModelMapper.toModel(response);
      }),
      tap(() => this.worksEditState.update(state => ({...state, isLoaded: false}))),
      finalize(() =>  this.setIsLoading(false)),
    )
    .subscribe({
      next: (work: WorkViewModel) => {
        this.worksEditState.update(state => ({
          ...state,
          error: undefined,
          selectedWorkId: workId,
          isLoaded: true,
          form: this.setWorkValues(work, state.form)
        }));
      },
      error: (error) => {
        this.worksEditState.update(state => ({
          ...state,
          works: [],
          error: error,
          selectedWorkId: undefined,
          pagination: undefined,
          isLoaded: false
        }));
      },
    });
  }

  private setWorkValues(work: WorkViewModel, form: FormGroup<WorksEditForm>) : FormGroup<WorksEditForm> {
    form.patchValue({
      name: work.name ?? null,
      observations: work.observations ?? null
    });

    return form;
  }

  edit(): void {

    if (this.worksEditState().selectedWorkId == undefined){
      this.worksEditState.update(state => ({...state, error: 'No hay un id de trabajo seleccionado'}));
      return;
    }
    
    this.setIsLoading(true);
    const workData = WorksEditFormMapper.toDomain(this.worksEditState().selectedWorkId!, this.worksEditState().form);

    this.worksBillingService.apiWorksIdPatch(workData)
    .pipe(
      finalize(() => this.setIsLoading(false))
    )
    .subscribe({
      next: () => {
        this.worksEditState.update(state => ({
          ...state,
          success: true,
          error: undefined,
        }));
      },
      error: (error) => {
        this.worksEditState.update(state => ({
          ...state,
          error: error.message,
          success: false,
        }));
      }
    });
  }

  private setIsLoading(isLoading: boolean): void {
    this.worksEditState.update(state => ({
      ...state,
      isLoading: isLoading,
    }));
  }
}