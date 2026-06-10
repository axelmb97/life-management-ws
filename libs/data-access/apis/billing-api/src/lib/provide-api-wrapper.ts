import { EnvironmentProviders } from "@angular/core";
import { BillingConfigurationParameters } from "./configuration";
import { provideApi } from "./provide-api";

export function provideBillingApi(configOrBasePath: string | BillingConfigurationParameters): EnvironmentProviders {
  return provideApi(configOrBasePath);
}