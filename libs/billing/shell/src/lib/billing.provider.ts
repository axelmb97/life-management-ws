import { EnvironmentProviders, makeEnvironmentProviders } from "@angular/core";
import { provideRouter } from "@angular/router";
import { provideAuthentication } from "@states/authentication";
import { billingRoutes } from "./billing.routes";
import { provideWorksQueryState } from "@states/works-query";
import { provideWorksNewState } from "@states/works-new";
import { provideWorksEditState } from "@states/works-edit"
import { provideWorksDeleteState } from "@states/works-delete"
import { ConfirmationService, MessageService } from "primeng/api";

export function provideBillingApp() : EnvironmentProviders {
  return makeEnvironmentProviders([
    provideRouter(billingRoutes),
    MessageService,
    ConfirmationService,
    // States
    provideAuthentication(),
    provideWorksQueryState(),
    provideWorksNewState(),
    provideWorksEditState(),
    provideWorksDeleteState()
  ]);
}