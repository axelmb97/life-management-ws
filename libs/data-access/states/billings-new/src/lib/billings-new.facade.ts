import { computed, inject, Injectable, signal } from "@angular/core";
import { BillingsNewFormMapper, BillingsNewState } from "./models";
import { BillingsBillingService } from "@data-access/apis/billing-api";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { FormErrorList } from '@data-access/models';
import { BillingsNewForm } from "./models/billings-new.form";
import { finalize } from "rxjs";

@Injectable()
export class BillingsNewFacade {
  private readonly billingsBillingService = inject(BillingsBillingService);
  private readonly builder = inject(FormBuilder);

  private readonly billingsNewState = signal<BillingsNewState>({
    isLoading: false,
    error: undefined,
    success: false,
    form: this.buildForm(),
    formErros: this.buildFormErrors()
  });

  readonly form = computed(() => this.billingsNewState().form);
  readonly formErrors = computed(() => this.billingsNewState().formErros);
  readonly isLoading = computed(() => this.billingsNewState().isLoading);
  readonly error = computed(() => this.billingsNewState().error);
  readonly success = computed(() => this.billingsNewState().success);

  init(): void {
    this.initState();
  }
  
  private initState(): void {
    this.billingsNewState.set({
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
        required: 'La importe es obligatorio',
        min: 'El importe debe ser mayor a cero'
      }
    };
  }

  private buildForm() : FormGroup<BillingsNewForm> {
    return this.builder.group({
      name: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(50)]],
      observations: ["", [Validators.minLength(3), Validators.maxLength(100)]],
      receptionDate: [new Date(), [Validators.required]],
      receptionDateFormatted: [""],
      workId: [null as number | null , [Validators.required]],
      amount: [0, [Validators.required, Validators.min(1)]]
    });
  }

  save(): void {
    this.setIsLoading(true);
    const billing = BillingsNewFormMapper.toDomain(this.billingsNewState().form);

    this.billingsBillingService.apiBillingsPost(billing)
    .pipe(
      finalize(() => this.setIsLoading(false))
    )
    .subscribe({
      next: () => {
        this.billingsNewState.update(state => ({
          ...state,
          success: true,
          error: undefined,
        }));
      },
      error: (error) => {
        this.billingsNewState.update(state => ({
          ...state,
          error: error.message,
          success: false,
        }));
      }
    });
  }

  private setIsLoading(isLoading: boolean): void {
    this.billingsNewState.update(state => ({
      ...state,
      isLoading: isLoading
    }));
  }
}