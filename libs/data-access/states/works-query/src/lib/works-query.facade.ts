// import { WorksQueryService } from '@data-access/apis/billing-api';
import { computed, inject, Injectable, signal } from '@angular/core';
import { WorksBillingService } from '@data-access/apis/billing-api';
import {  delay, finalize, map, } from 'rxjs';
import { WorksQueryState } from './models/works-query-state.interface';
import { WorkViewModelMapper } from '@data-access/mappers';
import { WorkViewModel } from "@data-access/models";
import { PaginationHeadersViewModel } from '@shared/models';
import { WorkFiltersViewModel } from './models/work-filters-view-model';
import { WorkFiltersViewModelMapper } from './models/work-filters-view-model.mapper';

@Injectable()
export class WorksQueryFacade{

  private readonly worksBillingService = inject(WorksBillingService);

  private readonly worksQueryState = signal<WorksQueryState>({
    works: [],
    filters: { page: 1 },
    error: undefined,
    isLoading: false,
    isLoaded: false,
    pagination: undefined
  });

  readonly filters = computed(() => this.worksQueryState().filters);
  readonly works = computed(() => this.worksQueryState().works);
  readonly error = computed(() => this.worksQueryState().error);
  readonly isLoading = computed(() => this.worksQueryState().isLoading);
  readonly isLoaded = computed(() => this.worksQueryState().isLoaded);
  readonly pagination = computed(() => this.worksQueryState().pagination);

  init(): void {
    this.initState();
  }

  private initState() : void {
    this.worksQueryState.set({
      works: [],
      filters: { page: 1 },
      error: undefined,
      isLoading: false,
      isLoaded: false,
      pagination: undefined
    });
  }

  getWorksByFilters(filters: WorkFiltersViewModel) : void {
    this.setIsLoading(true);
    const domainFilters = WorkFiltersViewModelMapper.toDomain(filters);
    
    this.worksBillingService.apiWorksGet(domainFilters, 'response')
    .pipe(
      delay(3000),
      finalize(() =>  this.setIsLoading(false)),
      map((response) => {
        const header = response.headers.get('x-pagination');
        const jsonObj: unknown = JSON.parse(header!);
        const pagination: PaginationHeadersViewModel = <PaginationHeadersViewModel>jsonObj;

        return {
          works: response.body?.map(c => WorkViewModelMapper.toModel(c)) ?? [] as WorkViewModel[],
          pagination: pagination
        };
      }),
    )
    .subscribe({
      next: ({works, pagination}) => {
        this.worksQueryState.update(state => ({
          ...state,
          error: undefined,
          works: works,
          pagination: pagination,
          isLoaded: true,
        }));
      },
      error: (error) => {
        this.worksQueryState.update(state => ({
          ...state,
          works: [],
          error: error,
          pagination: undefined,
          isLoaded: false
        }));
      },
    });
  }

  private setIsLoading(isLoading: boolean) {
    this.worksQueryState.update(state => ({
      ...state,
      isLoading
    }));
  }

}