import { Routes } from "@angular/router";
import { BaseRoutes } from "./enums/base-routes.enum";
import { Login } from "@shared/features/auth";
import { AppMain } from "@shared/layouts";

export const billingRoutes: Routes = [
  {
    path: BaseRoutes.Root, 
    component: AppMain
  },
  {path: BaseRoutes.Login, component: Login},
  {path: '**', redirectTo: BaseRoutes.Root},
];