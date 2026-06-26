import { FormControl } from "@angular/forms";

export interface BillingsNewForm {
  name: FormControl<string | null>;
  observations: FormControl<string | null>;
  receptionDate: FormControl<string | null>;
  workId: FormControl<number | null>;
  amount: FormControl<number | null>;
}