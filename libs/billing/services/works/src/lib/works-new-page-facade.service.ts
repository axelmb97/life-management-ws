import { inject, Injectable, OnDestroy } from "@angular/core";
import { WorksNewFacade } from "@states/works-new"

@Injectable()
export class WorksNewPageFacadeService implements OnDestroy {

  private readonly worksNewFacade = inject(WorksNewFacade);

  readonly isLoading = this.worksNewFacade.isLoading;
  readonly error = this.worksNewFacade.error;
  readonly success = this.worksNewFacade.success;
  readonly form = this.worksNewFacade.form;
  readonly formErrors = this.worksNewFacade.formErrors;

  init() : void {
    this.worksNewFacade.init();
  }

  ngOnDestroy(): void {
    this.worksNewFacade.init();
  }



  save() : void {
    if (this.form().invalid) {
      this.form().markAllAsTouched();
      return;
    }

    this.worksNewFacade.save();
    
  }

}