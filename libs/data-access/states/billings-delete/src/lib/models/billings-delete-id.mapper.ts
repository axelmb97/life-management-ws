import { ApiBillingsIdDeleteRequestParams } from "@data-access/apis/billing-api";

export class BillingsDeleteIdMapper {
  static toDomain(workId: number): ApiBillingsIdDeleteRequestParams {
    return {
      id: workId
    };
  }
}