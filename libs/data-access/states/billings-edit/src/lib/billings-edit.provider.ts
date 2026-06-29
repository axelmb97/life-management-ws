import { EnvironmentProviders, makeEnvironmentProviders } from "@angular/core";
import { BillingsEditFacade } from "./billings-edit.facade";

export function provideBillingsEditState() : EnvironmentProviders {
  return makeEnvironmentProviders([
    BillingsEditFacade
  ]);
}