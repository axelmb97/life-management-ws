import { EnvironmentProviders, makeEnvironmentProviders } from "@angular/core";
import { BillingsQueryFacade } from "./billings-query.facade";

export function provideBillingsQueryState() : EnvironmentProviders {
  return makeEnvironmentProviders([
    BillingsQueryFacade
  ]);
}