import { EnvironmentProviders, makeEnvironmentProviders } from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideAuthentication } from "@states/authentication";
import { billingRoutes } from "./billing.routes";


export function provideBillingApp() : EnvironmentProviders {
  return makeEnvironmentProviders([
    provideRouter(billingRoutes),
    provideAuthentication()
  ]);
}