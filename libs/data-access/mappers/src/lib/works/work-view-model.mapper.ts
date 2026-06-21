import { WorkDtoBillingModel } from "@data-access/apis/billing-api";
import { WorkViewModel } from "@data-access/models";

export class WorkViewModelMapper {
  static toModel(work: WorkDtoBillingModel): WorkViewModel {
    return {
      id: work.id,
      name: work.name,
      observations: work.observations,
    };
  }
}