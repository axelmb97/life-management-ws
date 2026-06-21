import { FormGroup } from "@angular/forms";
import { FormErrorList } from '@data-access/models';
import { WorksEditForm } from "./works-edit.form";

export interface WorksEditState {
  isLoading: boolean;
  isLoaded: boolean;
  error: string | undefined;
  success: boolean;
  selectedWorkId: number | undefined;
  form: FormGroup<WorksEditForm>;
  formErros: Record<string, FormErrorList>;
}