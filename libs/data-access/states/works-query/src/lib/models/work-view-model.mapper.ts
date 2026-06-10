import { WorkDtoBillingModel } from "@data-access/apis/billing-api";
import { WorkViewModel } from "./work-view-model";

export class WorkViewModelMapper {
  static toModel(work: WorkDtoBillingModel): WorkViewModel {
    return {
      id: work.id,
      name: work.name,
      observations: work.observations,
    };
  }
}