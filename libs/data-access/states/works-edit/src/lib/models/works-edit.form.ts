import { FormControl } from "@angular/forms";

export interface WorksEditForm {
  name: FormControl<string | null>;
  observations: FormControl<string | null>;
}