import { FormGroup } from "@angular/forms";
import { ApiBillingsPostRequestParams } from "@data-access/apis/billing-api";
import { BillingsNewForm } from "./billings-new.form";

export class BillingsNewFormMapper {
  static toDomain(form: FormGroup<BillingsNewForm>): ApiBillingsPostRequestParams {
    return {
      createBillingCommandBillingModel: {
        name: form.get('name')?.value,
        observations: form.get('observations')?.value ?? null,
        receptionDate: form.get('receptionDate')?.value ?? undefined,
        workId: form.get('workId')?.value ?? undefined,
        amount: form.get('amount')?.value ?? undefined
      }
    };
  }
}