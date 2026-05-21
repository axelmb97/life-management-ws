// import { WorksQueryService } from '@data-access/apis/billing-api';
import { computed, inject, Injectable, signal } from '@angular/core';
import { WorksBillingService } from '@data-access/apis/billing-api';
import {  finalize, map, } from 'rxjs';
import { WorksQueryState } from './models/works-query-state.interface';
import { WorkViewModelMapper } from './models/work-view-model.mapper';
import { WorkViewModel } from './models/work-view-model';

@Injectable()
export class WorksQueryFacade{

  private readonly worksBillingService = inject(WorksBillingService);

  private readonly worksQueryState = signal<WorksQueryState>({
    works: [],
    filters: { page: 1 },
    error: undefined,
    isLoading: false,
  });

  readonly filters = computed(() => this.worksQueryState().filters);
  readonly works = computed(() => this.worksQueryState().works);
  readonly error = computed(() => this.worksQueryState().error);
  readonly isLoading = computed(() => this.worksQueryState().isLoading);

  init(): void {
    this.initState();
  }

  private initState() : void {
    this.worksQueryState.update(() => ({
      works: [],
      filters: { page: 1 },
      error: undefined,
      isLoading: false,
    }));
  }

  getWorksByFilters() : void {
    this.setIsLoading(true);

    this.worksBillingService.apiWorksGet(this.worksQueryState().filters)
    .pipe(
      finalize(() =>  this.setIsLoading(false)),
      map((response) => response.map(c => WorkViewModelMapper.toModel(c)) ?? [] as WorkViewModel[]),
    )
    .subscribe({
      next: (works: WorkViewModel[]) => {
        this.worksQueryState.update(state => ({
          ...state,
          works: works,
        }));
      },
      error: (error) => {
        this.worksQueryState.update(state => ({
          ...state,
          works: [],
          error: error,
        }));
      },
    });
  }

  private setIsLoading(isLoading: boolean) {
    this.worksQueryState.update(state => ({
      ...state,
      isLoading,
    }));
  }

}