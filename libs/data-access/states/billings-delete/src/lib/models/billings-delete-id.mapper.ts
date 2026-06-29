import { ApiBillingsIdDeleteRequestParams } from "@data-access/apis/billing-api";

export class BillingsDeleteIdMapper {
  static toDomain(billingId: number): ApiBillingsIdDeleteRequestParams {
    return {
      id: billingId
    };
  }
}