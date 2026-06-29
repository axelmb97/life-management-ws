import { EnvironmentProviders, makeEnvironmentProviders } from "@angular/core";
import { BillingsDeleteFacade } from "./billings-delete.facade";

export function provideBillingsDeleteState() : EnvironmentProviders {
  return makeEnvironmentProviders([
    BillingsDeleteFacade
  ]);
}