/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, inject, OnInit } from '@angular/core';
import { WorksQueryPageFacadeService } from '@billing/services/works';
import { AppLoader } from '@shared/components';
import { WorkViewModel } from '@states/works-query';

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
import { JsonPipe } from '@angular/common';
import { WorksRoutes } from '@shared/models';
import { Router } from '@angular/router';

@Component({
  selector: 'billing-works-query',
  imports: [AppLoader, JsonPipe, TableModule, SkeletonModule, TagModule, AvatarModule, MenuModule, ButtonModule, InputTextModule, MultiSelectModule, InputTextModule],
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
        label: 'Editar',
        icon: 'pi pi-pencil',
        visible: true,
        // visible: await this.canViewEdit(item),
        // command: () => {
        //   this.router.navigate([`${SalesRoutes.Root}/${OperationsRoutes.Root}/${OperationsRoutes.Edit}/${item.encryptedId}`], {queryParamsHandling: 'preserve'})

        // },
      },
      {
        label: 'Eliminar',
        icon: 'pi pi-ban',
        visible: true,
        // command: () => {
        //   this.openNewStateDropdownDialog(item,`¿Está seguro que quiere anular la Operación N° ${item.code}?`,
        //     'La Operación se anuló correctamente','Ocurrió un error al anular la Operación',OperationStateTypes.Cancelled);
        // },
        // visible: await this.canViewCancel(item),

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
