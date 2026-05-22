import { Component, inject, OnInit } from '@angular/core';
import { WorksQueryPageFacadeService } from '@billing/services/works';
import { AppLoader } from '@shared/components';

@Component({
  selector: 'billing-works-query',
  imports: [AppLoader],
  providers: [WorksQueryPageFacadeService],
  templateUrl: './works-query.html',
  styleUrl: './works-query.css',
})
export class WorksQuery implements OnInit{
  worksQueryPageFacadeService = inject(WorksQueryPageFacadeService);
  works = this.worksQueryPageFacadeService.works;

  ngOnInit(): void {
    this.worksQueryPageFacadeService.init();
  }

}
