import { EnvironmentProviders, makeEnvironmentProviders } from "@angular/core";
import { WorksNewFacade } from "./works-new.facade";

export function provideWorksNewState() : EnvironmentProviders {
  return makeEnvironmentProviders([
    WorksNewFacade
  ]);
}