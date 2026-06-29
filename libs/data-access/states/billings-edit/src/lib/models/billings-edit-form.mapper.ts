import { FormGroup } from "@angular/forms";
import { BillingsEditForm } from "./billings-edit.form";
import { ApiBillingsIdPatchRequestParams } from "@data-access/apis/billing-api";

export class BillingsEditFormMapper {
  static toDomain(billingId: number, form: FormGroup<BillingsEditForm>): ApiBillingsIdPatchRequestParams {
    return {
      id: billingId,
      patchBillingCommandBillingModel: {
        name: form.get('name')?.value,
        observations: form.get('observations')?.value ?? null,
        receptionDate: form.get('receptionDateFormatted')?.value ?? undefined,
        workId: form.get('workId')?.value ?? undefined,
        amount: form.get('amount')?.value ?? undefined
      }
    };
  }
}