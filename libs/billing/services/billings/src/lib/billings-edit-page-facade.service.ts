import { computed, effect, inject, Injectable, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { BillingsRoutes } from "@shared/models";
import { DatesHandlerService, GlobalToastHandlerService } from "@shared/services";
import { BillingsEditFacade } from "@states/billings-edit";
import { WorksQueryFacade } from "@states/works-query";

@Injectable()
export class BillingsEditPageFacadeService implements OnDestroy {
  
  private readonly billingsEditFacade = inject(BillingsEditFacade);
  private readonly worksQueryFacade = inject(WorksQueryFacade);
  private readonly datesHandlerService = inject(DatesHandlerService);

  private readonly error = this.billingsEditFacade.error;
  private readonly success = this.billingsEditFacade.success;
  readonly form = this.billingsEditFacade.form;
  readonly formErrors = this.billingsEditFacade.formErrors;

  readonly works = this.worksQueryFacade.works;
  readonly areWorksLoading = this.worksQueryFacade.isLoading;
  private readonly worksLoadingErrorEffect = this.buildWorksErrorEffect();

  readonly isLoading = computed(() => {
    return this.billingsEditFacade.isLoading() || this.worksQueryFacade.isLoading();
  });

  private readonly router = inject(Router);
  private readonly globalToastHandlerService = inject(GlobalToastHandlerService);
  private readonly successEffect = this.buildSuccessEffect();
  private readonly errorEffect = this.buildErrorEffect();
  
  init(billingId: number) : void {
    this.billingsEditFacade.init();
    this.worksQueryFacade.init()

    this.worksQueryFacade.getWorksByFilters({});
    this.billingsEditFacade.setSelectedBilling(billingId);
  }

  ngOnDestroy(): void {
    this.billingsEditFacade.init();
    this.worksQueryFacade.init()
  }

  private buildSuccessEffect()  {
    return effect(() => {
      const isSuccess = this.success();

      if (!isSuccess) return;
      this.globalToastHandlerService.showSuccess({ message: 'Se edito la facturación correctamente'});
      this.goBack();
    });
  }

  private buildErrorEffect() {
    return effect(() => {
      const hasError = this.error() != undefined;

      if (!hasError) return;
      this.globalToastHandlerService.showError({ message: 'No se pudo editar la facturación'});
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

  edit() : void {
    if (this.form().invalid) {
      this.form().markAllAsTouched();
      return;
    }

    if (!this.isDateFormatted()) {
      const selectedDate = this.form().controls.receptionDate.value ?? new Date();
      this.formatDate(selectedDate);
    }

    this.billingsEditFacade.edit();
  }

  private isDateFormatted() {
    return this.form().controls.receptionDateFormatted.value != null 
            && this.form().controls.receptionDateFormatted.value != "";
  }

  goBack(): void {
    const queryRoute = `${BillingsRoutes.Root}/${BillingsRoutes.Query}`;
    this.router.navigate([queryRoute]);
  }
}