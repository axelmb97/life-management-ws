import { effect, inject, Injectable, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { WorksRoutes } from "@shared/models";
import { GlobalToastHandlerService } from "@shared/services";
import { WorksNewFacade } from "@states/works-new"

@Injectable()
export class WorksNewPageFacadeService implements OnDestroy {

  private readonly worksNewFacade = inject(WorksNewFacade);
  readonly isLoading = this.worksNewFacade.isLoading;
  readonly error = this.worksNewFacade.error;
  readonly success = this.worksNewFacade.success;
  readonly form = this.worksNewFacade.form;
  readonly formErrors = this.worksNewFacade.formErrors;

  private readonly router = inject(Router);
  private readonly globalToastHandlerService = inject(GlobalToastHandlerService);
  private readonly successEffect = this.buildSuccessEffect();
  private readonly errorEffect = this.buildErrorEffect();
  init() : void {
    this.worksNewFacade.init();
  }

  ngOnDestroy(): void {
    this.worksNewFacade.init();
  }

  private buildSuccessEffect()  {
    return effect(() => {
      const isSuccess = this.success();

      if (!isSuccess) return;
      this.globalToastHandlerService.showSuccess({ message: 'Se registro el trabajo correctamente'});
      this.goBack();
    });
  }

  private buildErrorEffect() {
    return effect(() => {
      const hasError = this.error() != undefined;

      if (!hasError) return;
      this.globalToastHandlerService.showError({ message: 'No se pudo registrar el trabajo'});
    });
  }

  save() : void {
    if (this.form().invalid) {
      this.form().markAllAsTouched();
      return;
    }

    this.worksNewFacade.save();
  }

  goBack() : void {
    const queryRoute = `${WorksRoutes.Root}/${WorksRoutes.Query}`;
    this.router.navigate([queryRoute]);
  }
}