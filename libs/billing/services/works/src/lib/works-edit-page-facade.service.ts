import { effect, inject, Injectable, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";
import { WorksRoutes } from "@shared/models";
import { GlobalToastHandlerService } from "@shared/services";
import { WorksEditFacade } from "@states/works-edit"

@Injectable()
export class WorksEditPageFacadeService implements OnDestroy {
  
  private readonly worksEditFacade = inject(WorksEditFacade);
  readonly isLoading = this.worksEditFacade.isLoading;
  readonly error = this.worksEditFacade.error;
  readonly success = this.worksEditFacade.success;
  readonly form = this.worksEditFacade.form;
  readonly formErrors = this.worksEditFacade.formErrors;

  private readonly router = inject(Router);
  private readonly globalToastHandlerService = inject(GlobalToastHandlerService);
  private readonly successEffect = this.buildSuccessEffect();
  private readonly errorEffect = this.buildErrorEffect();
  
  init(workId: number) : void {
    this.worksEditFacade.init();

    this.worksEditFacade.setSelectedWork(workId);
  }

  ngOnDestroy(): void {
    this.worksEditFacade.init();
  }

  private buildSuccessEffect()  {
    return effect(() => {
      const isSuccess = this.success();

      if (!isSuccess) return;
      this.globalToastHandlerService.showSuccess({ message: 'Se edito el trabajo correctamente'});
      this.goBack();
    });
  }

  private buildErrorEffect() {
    return effect(() => {
      const hasError = this.error() != undefined;

      if (!hasError) return;
      this.globalToastHandlerService.showError({ message: 'No se pudo editar el trabajo'});
    });
  }

  save() : void {
    if (this.form().invalid) {
      this.form().markAllAsTouched();
      return;
    }

    this.worksEditFacade.edit();
  }

  goBack(): void {
    const queryRoute = `${WorksRoutes.Root}/${WorksRoutes.Query}`;
    this.router.navigate([queryRoute]);
  }
}
