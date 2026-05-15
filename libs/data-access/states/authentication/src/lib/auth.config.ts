import { EnvironmentProviders, makeEnvironmentProviders } from "@angular/core";
import { AuthFacade } from "./auth.facade";

export function provideAuthentication() : EnvironmentProviders {
  return makeEnvironmentProviders([
    AuthFacade
  ]);
}