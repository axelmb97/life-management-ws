import { Routes } from "@angular/router";

import { Login } from "@shared/features/auth";
import { AppMain } from "@shared/layouts";
import { BaseRoutes, WorksRoutes } from "@shared/models";
import { WorksNew, WorksQuery } from "@billing/features/works";

export const billingRoutes: Routes = [
  {
    path: BaseRoutes.Root, 
    component: AppMain,
    children: [
      { path: `${WorksRoutes.Root}/${WorksRoutes.Query}`, component: WorksQuery },
      { path: `${WorksRoutes.Root}/${WorksRoutes.Add}`, component: WorksNew },
    ]
  },
  { path: BaseRoutes.Login, component: Login },
  { path: '**', redirectTo: BaseRoutes.Root },
];