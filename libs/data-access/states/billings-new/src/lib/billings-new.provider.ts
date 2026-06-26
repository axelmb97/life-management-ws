import { EnvironmentProviders, makeEnvironmentProviders } from "@angular/core";
import { BillingsNewFacade } from "./billings-new.facade";

export function provideBillingsNewState() : EnvironmentProviders {
  return makeEnvironmentProviders([
    BillingsNewFacade
  ]);
}