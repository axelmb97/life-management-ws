import { ApiBillingsIdGetRequestParams } from "@data-access/apis/billing-api";

export class BillingsGetByIdFiltersMapper {
  static toDomain(billingId: number): ApiBillingsIdGetRequestParams {
    return {
      id: billingId
    }
  } 
}