import { Routes } from "@angular/router";

import { Login } from "@shared/features/auth";
import { AppMain } from "@shared/layouts";
import { BaseRoutes, BillingsRoutes, WorksRoutes } from "@shared/models";
import { WorksEdit, WorksNew, WorksQuery } from "@billing/features/works";
import { BillingsQuery } from "@billing/features/billings";

export const billingRoutes: Routes = [
  {
    path: BaseRoutes.Root, 
    component: AppMain,
    children: [
      { path: `${WorksRoutes.Root}/${WorksRoutes.Query}`, component: WorksQuery },
      { path: `${WorksRoutes.Root}/${WorksRoutes.Add}`, component: WorksNew },
      { path: `${WorksRoutes.Root}/${WorksRoutes.Edit}/:id`, component: WorksEdit },

      { path: `${BillingsRoutes.Root}/${BillingsRoutes.Query}`, component: BillingsQuery },
    ]
  },
  { path: BaseRoutes.Login, component: Login },
  { path: '**', redirectTo: BaseRoutes.Root },
];