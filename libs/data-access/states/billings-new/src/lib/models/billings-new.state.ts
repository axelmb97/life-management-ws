import { FormGroup } from "@angular/forms";
import { BillingsNewForm } from "./billings-new.form";
import { FormErrorList } from '@data-access/models';

export interface BillingsNewState {
  isLoading: boolean;
  error: string | undefined;
  success: boolean;
  form: FormGroup<BillingsNewForm>;
  formErros: Record<string, FormErrorList>;
}