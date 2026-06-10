import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { BillingConfiguration } from './configuration';
import { HttpClient } from '@angular/common/http';


@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: []
})
export class BillingApiModule {
    public static forRoot(configurationFactory: () => BillingConfiguration): ModuleWithProviders<BillingApiModule> {
        return {
            ngModule: BillingApiModule,
            providers: [ { provide: BillingConfiguration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: BillingApiModule,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('BillingApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
