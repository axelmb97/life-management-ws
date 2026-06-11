import { WorkNewForm } from "./work-new.form";
import { FormGroup } from "@angular/forms";

export interface WorksNewState {
  isLoading: boolean;
  error: string | undefined;
  success: boolean;
  form: FormGroup<WorkNewForm>;
}