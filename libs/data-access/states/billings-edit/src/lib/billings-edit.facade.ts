import { computed, inject, Injectable, signal } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BillingsBillingService } from "@data-access/apis/billing-api";
import { BillingViewModel, FormErrorList } from "@data-access/models";
import { finalize, map, tap } from "rxjs";
import { BillingsEditForm, BillingsEditFormMapper, BillingsEditState, BillingsGetByIdFiltersMapper } from "./models";
import { BillingViewModelMapper } from "@data-access/mappers";

@Injectable()
export class BillingsEditFacade {
  private readonly billingsBillingService = inject(BillingsBillingService);
  private readonly builder = inject(FormBuilder);

  private readonly billingsEditState = signal<BillingsEditState>({
    isLoading: false,
    isLoaded: false,
    error: undefined,
    success: false,
    selectedBillingId: undefined,
    form: this.buildForm(),
    formErros: this.buildFormErrors()
  });

  readonly form = computed(() => this.billingsEditState().form);
  readonly formErrors = computed(() => this.billingsEditState().formErros);
  readonly isLoading = computed(() => this.billingsEditState().isLoading);
  readonly isLoaded = computed(() => this.billingsEditState().isLoaded);
  readonly error = computed(() => this.billingsEditState().error);
  readonly success = computed(() => this.billingsEditState().success);

  init(): void {
    this.initState();
  }
  
  private initState(): void {
    this.billingsEditState.set({
      isLoading: false,
      isLoaded: false,
      error: undefined,
      success: false,
      selectedBillingId: undefined,
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
      },
      receptionDate: {
        required: 'La fecha de recepción es obligatoria'
      },
      workId: {
        required: 'El trabajo es obligatorio'
      },
      amount: {
        required: 'El importe es obligatorio',
        min: 'El importe debe ser mayor a cero'
      }
    };
  }

  private buildForm() : FormGroup<BillingsEditForm> {
    return this.builder.group({
      name: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      observations: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      receptionDate: [new Date(), [Validators.required]],
      receptionDateFormatted: [""],
      workId: [null as number | null , [Validators.required]],
      amount: [0, [Validators.required, Validators.min(1)]]
    });
  }

  setSelectedBilling(billingId: number) {
    this.setIsLoading(true);
    const filters = BillingsGetByIdFiltersMapper.toDomain(billingId);

    this.billingsBillingService.apiBillingsIdGet(filters)
    .pipe(
      map((response) => {
        return BillingViewModelMapper.toModel(response);
      }),
      tap(() => this.billingsEditState.update(state => ({...state, isLoaded: false}))),
      finalize(() =>  this.setIsLoading(false)),
    )
    .subscribe({
      next: (billing: BillingViewModel) => {
        this.billingsEditState.update(state => ({
          ...state,
          error: undefined,
          selectedBillingId: billingId,
          isLoaded: true,
          form: this.setBillingValues(billing, state.form)
        }));
      },
      error: (error) => {
        this.billingsEditState.update(state => ({
          ...state,
          works: [],
          error: error,
          selectedBillingId: undefined,
          pagination: undefined,
          isLoaded: false
        }));
      },
    });
  }

  private setBillingValues(billing: BillingViewModel, form: FormGroup<BillingsEditForm>) : FormGroup<BillingsEditForm> {
    form.patchValue({
      name: billing.name ?? null,
      observations: billing.observations ?? null,
      receptionDate: billing.receptionDate ? new Date(billing.receptionDate) : new Date(),
      workId: billing.workId ?? null, 
      amount: billing.amount ?? null
    });

    return form;
  }

  edit(): void {

    if (this.billingsEditState().selectedBillingId == undefined){
      this.billingsEditState.update(state => ({...state, error: 'No hay un id de facturación seleccionado'}));
      return;
    }
    
    this.setIsLoading(true);
    const workData = BillingsEditFormMapper.toDomain(this.billingsEditState().selectedBillingId!, this.billingsEditState().form);

    this.billingsBillingService.apiBillingsIdPatch(workData)
    .pipe(
      finalize(() => this.setIsLoading(false))
    )
    .subscribe({
      next: () => {
        this.billingsEditState.update(state => ({
          ...state,
          success: true,
          error: undefined,
        }));
      },
      error: (error) => {
        this.billingsEditState.update(state => ({
          ...state,
          error: error.message,
          success: false,
        }));
      }
    });
  }

  private setIsLoading(isLoading: boolean): void {
    this.billingsEditState.update(state => ({
      ...state,
      isLoading: isLoading,
    }));
  }
}