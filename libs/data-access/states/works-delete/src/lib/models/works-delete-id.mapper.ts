import { ApiWorksIdDeleteRequestParams } from "@data-access/apis/billing-api";

export class WorksDeleteIdMapper {
  static toDomain(workId: number): ApiWorksIdDeleteRequestParams {
    return {
      id: workId
    };
  }
}