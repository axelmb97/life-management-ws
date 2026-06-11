import { FormControl } from "@angular/forms";

export interface WorkNewForm {
  name: FormControl<string | null>;
  observations: FormControl<string | null>;
}