import { EnvironmentProviders, makeEnvironmentProviders } from "@angular/core";
import { WorksQueryFacade } from "./works-query.facade";

export function provideWorksQueryState() : EnvironmentProviders {
  return makeEnvironmentProviders([
    WorksQueryFacade
  ]);
}