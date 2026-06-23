import { EnvironmentProviders, makeEnvironmentProviders } from "@angular/core";
import { WorksDeleteFacade } from "./works-delete.facade";

export function provideWorksDeleteState() : EnvironmentProviders {
  return makeEnvironmentProviders([
    WorksDeleteFacade
  ]);
}