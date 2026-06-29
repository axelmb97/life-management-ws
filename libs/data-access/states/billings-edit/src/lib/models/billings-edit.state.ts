import { FormGroup } from "@angular/forms";
import { BillingsEditForm } from "./billings-edit.form";
import { FormErrorList } from "@data-access/models";

export interface BillingsEditState {
  isLoading: boolean;
  isLoaded: boolean;
  error: string | undefined;
  success: boolean;
  form: FormGroup<BillingsEditForm>;
  formErros: Record<string, FormErrorList>;
  selectedBillingId: number | undefined;
}