import { ApiWorksPostRequestParams } from "@data-access/apis/billing-api";
import { WorkNewForm } from "./work-new.form";
import { FormGroup } from "@angular/forms";

export class WorksNewFormMapper {
  static toDomain(form: FormGroup<WorkNewForm>): ApiWorksPostRequestParams {
    return {
      postWorkCommandBillingModel: {
        name: form.get('name')?.value,
        observations: form.get('observations')?.value ?? null
      }
    };
  }
}