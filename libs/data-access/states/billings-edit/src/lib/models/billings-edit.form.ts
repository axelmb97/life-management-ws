import { FormControl } from "@angular/forms";

export interface BillingsEditForm {
  name: FormControl<string | null>;
  observations: FormControl<string | null>;
  receptionDate: FormControl<Date | null>;
  receptionDateFormatted: FormControl<string | null>;
  workId: FormControl<number | null>;
  amount: FormControl<number | null>;
}