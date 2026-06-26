export * from './billings.service';
import { BillingsBillingService } from './billings.service';
export * from './billings.serviceInterface';
export * from './works.service';
import { WorksBillingService } from './works.service';
export * from './works.serviceInterface';
export const APIS = [BillingsBillingService, WorksBillingService];
