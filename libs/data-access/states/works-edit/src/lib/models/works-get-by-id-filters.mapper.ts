import { ApiWorksIdGetRequestParams } from "@data-access/apis/billing-api";

export class WorksGetByIdFiltersmMapper {
  static toDomain(workId: number): ApiWorksIdGetRequestParams {
    return {
      id: workId
    }
  } 
}