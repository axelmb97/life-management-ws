import { WorkNewForm } from "./work-new.form";
import { FormGroup } from "@angular/forms";
import { FormErrorList } from '@data-access/models';

export interface WorksNewState {
  isLoading: boolean;
  error: string | undefined;
  success: boolean;
  form: FormGroup<WorkNewForm>;
  formErros: Record<string, FormErrorList>;
}