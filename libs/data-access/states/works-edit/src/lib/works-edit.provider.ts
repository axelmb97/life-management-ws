import { EnvironmentProviders, makeEnvironmentProviders } from "@angular/core";
import { WorksEditFacade } from "./works-edit.facade";

export function provideWorksEditState() : EnvironmentProviders {
  return makeEnvironmentProviders([
    WorksEditFacade
  ]);
}