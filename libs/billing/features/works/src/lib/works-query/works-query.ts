/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, inject, OnInit } from '@angular/core';
import { WorksQueryPageFacadeService } from '@billing/services/works';
import { WorkViewModel } from '@data-access/models';

//PrimeNG
import { TableModule } from 'primeng/table';
import { SkeletonModule } from 'primeng/skeleton';
import { TagModule } from 'primeng/tag';
import { AvatarModule } from 'primeng/avatar';
import { Menu, MenuModule } from 'primeng/menu';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { MenuItem } from 'primeng/api';
import { WorksRoutes } from '@shared/models';
import { Router } from '@angular/router';

@Component({
  selector: 'billing-works-query',
  imports: [TableModule, SkeletonModule, TagModule, AvatarModule, MenuModule, ButtonModule, InputTextModule, MultiSelectModule, InputTextModule],
  providers: [WorksQueryPageFacadeService],
  templateUrl: './works-query.html',
  styleUrl: './works-query.css',
})
export class WorksQuery implements OnInit{
  readonly worksQueryPageFacadeService = inject(WorksQueryPageFacadeService);
  private readonly router = inject(Router);

  colsToShow: any[] = [
    { field: 'name', header: 'Nombre' },
    { field: 'observations', header: 'Observaciones' }
  ];

  itemsMenu: MenuItem[] = [];

  ngOnInit(): void {
    this.worksQueryPageFacadeService.init();
  }

  getEntities(): WorkViewModel[] {
    return this.worksQueryPageFacadeService.works();
  }

  getPagination(): number {
    const pagination = this.worksQueryPageFacadeService.pagination();
    return pagination?.total ?? 0;
  }

  navigateToCreation(): void {
    const route =  `${WorksRoutes.Root}/${WorksRoutes.Add}`;
    this.router.navigate([route]);
  }

  generateMenu(item: WorkViewModel, menu: Menu, event: Event): void {
    menu.toggle(event);
    const itemsAux = [
      {
        label: 'Ver Facturaciones',
        icon: 'pi pi-eye',
        visible: true,
      },
      {
        label: 'Editar',
        icon: 'pi pi-pencil',
        visible: true,
      },
      {
        label: 'Eliminar',
        icon: 'pi pi-ban',
        visible: true,
      },
    ];

    const itemsVisible = itemsAux.filter((item) => item.visible !== false);

    if (itemsVisible.length === 0) {
      this.itemsMenu = [
        {
          label: 'Sin acciones disponibles',
          icon: 'pi pi-ban',
          title: 'Sin acciones disponibles',
        },
      ];

      return;
    }

    this.itemsMenu = itemsAux;
  }
}
