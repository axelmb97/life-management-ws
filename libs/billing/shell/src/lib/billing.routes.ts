import { Routes } from "@angular/router";
import { BaseRoutes } from "./enums/base-routes.enum";
import { Login } from "@shared/features/auth";

export const billingRoutes: Routes = [
  // {
  //   path: BaseRoutes.Root, 
  //   component: Login
  // },
  {path: BaseRoutes.Login, component: Login},
  {path: '**', redirectTo: BaseRoutes.Root},
];