import { computed, effect, inject, Injectable, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { BillingsRoutes } from "@shared/models";
import { DatesHandlerService, GlobalToastHandlerService } from "@shared/services";
import { BillingsNewFacade } from "@states/billings-new";
import { WorksQueryFacade } from "@states/works-query";

@Injectable()
export class BillingsNewPageFacadeService implements OnDestroy{
  private readonly billingsNewFacade = inject(BillingsNewFacade);
  private readonly worksQueryFacade = inject(WorksQueryFacade);
  private readonly datesHandlerService = inject(DatesHandlerService);

  readonly error = this.billingsNewFacade.error;
  readonly success = this.billingsNewFacade.success;
  readonly form = this.billingsNewFacade.form;
  readonly formErrors = this.billingsNewFacade.formErrors;
  
  readonly works = this.worksQueryFacade.works;
  readonly areWorksLoading = this.worksQueryFacade.isLoading;
  private readonly worksLoadingErrorEffect = this.buildWorksErrorEffect();

  readonly isLoading = computed(() => {
    return this.billingsNewFacade.isLoading() || this.worksQueryFacade.isLoading();
  });

  private readonly router = inject(Router);
  private readonly globalToastHandlerService = inject(GlobalToastHandlerService);
  private readonly successEffect = this.buildSuccessEffect();
  private readonly errorEffect = this.buildErrorEffect();

  init() : void {
    this.billingsNewFacade.init();
    this.worksQueryFacade.init();

    //TODO: ACA HAY DEBERIAN VENIR LOS TRABAJOS PROPIOS SOLAMENTE.
    // SE FITLRA DESDE EL BACK CON EL USERID QUE VIENE DEL TOKEN. FALTA DESARROLLAR APP DE SEGUIRDAD
    // Y CONFIGURAR EL TOKEN EN LA API.
    this.worksQueryFacade.getWorksByFilters({});
  }

  ngOnDestroy(): void {
    this.billingsNewFacade.init();
    this.worksQueryFacade.init();
  }

  private buildSuccessEffect()  {
    return effect(() => {
      const isSuccess = this.success();

      if (!isSuccess) return;
      this.globalToastHandlerService.showSuccess({ message: 'Se registro la facturación correctamente'});
      this.goBack();
    });
  }

  private buildErrorEffect() {
    return effect(() => {
      const hasError = this.error() != undefined;

      if (!hasError) return;
      this.globalToastHandlerService.showError({ message: 'No se pudo registrar la facturación'});
    });
  }

  private buildWorksErrorEffect() {
    return effect(() => {
      const hasError = this.worksQueryFacade.error() != undefined;

      if (!hasError) return;

      this.globalToastHandlerService.showError({ message: 'No se pudieron cargar los trabajos. Intente de nuevo.'});

      this.goBack();
    });
  }

  onDateSelect(date: Date) : void {
    this.formatDate(date);
  }

  private formatDate(date: Date) : void {
    const iso = date.toISOString();
    const formattedDate = this.datesHandlerService.convertFromDateISO(iso) ?? "";
    this.form().controls.receptionDateFormatted.setValue(formattedDate);
  }

  save() : void {
    if (this.form().invalid) {
      this.form().markAllAsTouched();
      return;
    }

    if (!this.isDateFormatted()) {
      const selectedDate = this.form().controls.receptionDate.value ?? new Date();
      this.formatDate(selectedDate);
    }

    this.billingsNewFacade.save();
  }

  private isDateFormatted() {
    return this.form().controls.receptionDateFormatted.value != null 
            && this.form().controls.receptionDateFormatted.value != "";
  }

  goBack() : void {
    const queryRoute = `${BillingsRoutes.Root}/${BillingsRoutes.Query}`;
    this.router.navigate([queryRoute]);
  }
}