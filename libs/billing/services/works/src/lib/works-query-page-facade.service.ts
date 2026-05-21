import { inject, Injectable } from "@angular/core";
import { WorksQueryFacade } from "@states/works-query";

@Injectable({
  providedIn: 'root'
})
export class WorksQueryPageFacadeService{
  private readonly worksQueryFacade = inject(WorksQueryFacade);
  
  works = this.worksQueryFacade.works;

  init(): void {
    this.worksQueryFacade.init();

    this.worksQueryFacade.getWorksByFilters();
  }

  getWorksByFilters(): void {
    this.worksQueryFacade.getWorksByFilters();
  }
}