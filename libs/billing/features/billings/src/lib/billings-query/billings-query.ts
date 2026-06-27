import { CurrencyPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BillingsQueryPageFacadeService } from '@billing/services/billings';
import { BillingViewModel } from '@data-access/models';
import { BillingsRoutes, ConfirmDialogData } from '@shared/models';
import { ConfirmDialogHandlerService } from '@shared/services';
import { DateFormatterPipe } from "@shared/utils";
import { MenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { InputNumber } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { Menu, MenuModule } from 'primeng/menu';
import { MultiSelectModule } from 'primeng/multiselect';
import { SkeletonModule } from 'primeng/skeleton';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { DatePickerModule } from 'primeng/datepicker';

@Component({
  selector: 'billing-billings-query',
  imports: [TableModule, SkeletonModule, TagModule, AvatarModule, MenuModule, ButtonModule, InputTextModule, MultiSelectModule, InputTextModule, DateFormatterPipe, CurrencyPipe, InputNumber, FormsModule, DatePickerModule],
  templateUrl: './billings-query.html',
  styleUrl: './billings-query.css',
  providers: [BillingsQueryPageFacadeService],
  standalone: true,
})
export class BillingsQuery {
  readonly billingsQueryPageFacadeService = inject(BillingsQueryPageFacadeService);
  private readonly confirmationDialogHandler = inject(ConfirmDialogHandlerService);
  private readonly router = inject(Router);

  colsToShow: any[] = [
    { field: 'name', header: 'Nombre' },
    { field: 'observations', header: 'Observaciones' },
    { field: 'workName', header: 'Trabajo' },
    { field: 'amount', header: 'Importe' },
    { field: 'receptionDate', header: 'Fecha de Pago' }
  ];

  itemsMenu: MenuItem[] = [];

  ngOnInit(): void {
    this.billingsQueryPageFacadeService.init();
  }

  getEntities(): BillingViewModel[] {
    return this.billingsQueryPageFacadeService.billings();
  }

  getPagination(): number {
    const pagination = this.billingsQueryPageFacadeService.pagination();
    return pagination?.total ?? 0;
  }

  navigateToCreation(): void {
    const route =  `${BillingsRoutes.Root}/${BillingsRoutes.New}`;
    this.router.navigate([route]);
  }

  generateMenu(item: BillingViewModel, menu: Menu, event: Event): void {
    menu.toggle(event);
    const itemsAux = [
      {
        label: 'Editar',
        icon: 'pi pi-pencil',
        visible: true,
        command: () => {
          const editionRoute = `${BillingsRoutes.Root}/${BillingsRoutes.Edit}/${item.id}`;
          this.router.navigate([editionRoute]);
        }
      },
      {
        label: 'Eliminar',
        icon: 'pi pi-ban',
        visible: true,
        // command: ()=> {
        //   const data = { 
        //     message: `¿Desea eliminar el registro: ${item.name}?`,
        //     acceptBtnTitle: 'Eliminar',
        //     acceptFn: () => this.billingsQueryPageFacadeService.delete(item.id)
        //   } as ConfirmDialogData;
        //   this.confirmationDialogHandler.showDialog(data);
        // }
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
