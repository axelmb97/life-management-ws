import { Routes } from "@angular/router";
import { BaseRoutes } from "./enums/base-routes.enum";
import { Login } from "@shared/features/auth";
import { AppMain } from "@shared/layouts";
import { WorksRoutes } from "./enums/works-routes.enum";
import { WorksQuery } from "@billing/features/works";

export const billingRoutes: Routes = [
  {
    path: BaseRoutes.Root, 
    component: AppMain,
    children: [
      { path: `${WorksRoutes.Root}/${WorksRoutes.Query}`, component: WorksQuery },
    ]
  },
  { path: BaseRoutes.Login, component: Login },
  { path: '**', redirectTo: BaseRoutes.Root },
];