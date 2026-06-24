import { BillingDtoBillingModel } from "@data-access/apis/billing-api";
import { BillingViewModel } from "@data-access/models";

export class BillingViewModelMapper {
  static toModel(billing: BillingDtoBillingModel): BillingViewModel {
    return {
      id: billing.id,
      name: billing.name,
      observations: billing.observations,
      workName: billing.workName,
      receptionDate: billing.receptionDate,
      amount: billing.amount
    };
  }
}