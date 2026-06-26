import { EnvironmentProviders, makeEnvironmentProviders } from "@angular/core";
import { provideRouter } from "@angular/router";
import { ConfirmationService, MessageService } from "primeng/api";

import { billingRoutes } from "./billing.routes";
import { provideAuthentication } from "@states/authentication";
import { provideWorksQueryState } from "@states/works-query";
import { provideWorksNewState } from "@states/works-new";
import { provideWorksEditState } from "@states/works-edit";
import { provideWorksDeleteState } from "@states/works-delete";
import { provideBillingsQueryState } from "@states/billings-query";
import { provideBillingsNewState } from "@states/billings-new";

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
    provideWorksDeleteState(),

    provideBillingsQueryState(),
    provideBillingsNewState()
  ]);
}