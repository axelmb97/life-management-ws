import { ApiWorksIdPatchRequestParams } from "@data-access/apis/billing-api";
import { FormGroup } from "@angular/forms";
import { WorksEditForm } from "./works-edit.form";

export class WorksEditFormMapper {
  static toDomain(workId: number, form: FormGroup<WorksEditForm>): ApiWorksIdPatchRequestParams {
    return {
      id: workId,
      patchWorkCommandBillingModel: {
        name: form.get('name')?.value,
        observations: form.get('observations')?.value ?? null
      }
    };
  }
}