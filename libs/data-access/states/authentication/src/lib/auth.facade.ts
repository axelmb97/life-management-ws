import {  Injectable, signal, WritableSignal } from "@angular/core";
import { MenuItem } from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class AuthFacade {
  loading$: WritableSignal<boolean> = signal(false);
  options$: WritableSignal<MenuItem[]> = signal<MenuItem[]>([]);

  searchOptions() {
    // Peticion a api para ver las opciones
    this.options$.set([
      {
        label: 'Features',
        items: [
          { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] },
          { label: 'Trabajos', icon: 'pi pi-fw pi-home', routerLink: ['/works/query'] },
          { label: 'Documentos', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
        ]
      },
      // {
      //     label: 'Home',
      //     items: [{ label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/'] }]
      // },
      // {
      //     label: 'UI Components',
      //     items: [
      //         { label: 'Form Layout', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formlayout'] },
      //         { label: 'Input', icon: 'pi pi-fw pi-check-square', routerLink: ['/uikit/input'] },
      //         { label: 'Button', icon: 'pi pi-fw pi-mobile', class: 'rotated-icon', routerLink: ['/uikit/button'] },
      //         { label: 'Table', icon: 'pi pi-fw pi-table', routerLink: ['/uikit/table'] },
      //         { label: 'List', icon: 'pi pi-fw pi-list', routerLink: ['/uikit/list'] },
      //         { label: 'Tree', icon: 'pi pi-fw pi-share-alt', routerLink: ['/uikit/tree'] },
      //         { label: 'Panel', icon: 'pi pi-fw pi-tablet', routerLink: ['/uikit/panel'] },
      //         { label: 'Overlay', icon: 'pi pi-fw pi-clone', routerLink: ['/uikit/overlay'] },
      //         { label: 'Media', icon: 'pi pi-fw pi-image', routerLink: ['/uikit/media'] },
      //         { label: 'Menu', icon: 'pi pi-fw pi-bars', routerLink: ['/uikit/menu'] },
      //         { label: 'Message', icon: 'pi pi-fw pi-comment', routerLink: ['/uikit/message'] },
      //         { label: 'File', icon: 'pi pi-fw pi-file', routerLink: ['/uikit/file'] },
      //         { label: 'Chart', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/uikit/charts'] },
      //         { label: 'Timeline', icon: 'pi pi-fw pi-calendar', routerLink: ['/uikit/timeline'] },
      //         { label: 'Misc', icon: 'pi pi-fw pi-circle', routerLink: ['/uikit/misc'] }
      //     ]
      // },
      // {
      //     label: 'Pages',
      //     icon: 'pi pi-fw pi-briefcase',
      //     path: '/pages',
      //     items: [
      //         {
      //             label: 'Landing',
      //             icon: 'pi pi-fw pi-globe',
      //             routerLink: ['/landing']
      //         },
      //         {
      //             label: 'Auth',
      //             icon: 'pi pi-fw pi-user',
      //             path: '/auth',
      //             items: [
      //                 {
      //                     label: 'Login',
      //                     icon: 'pi pi-fw pi-sign-in',
      //                     routerLink: ['/login']
      //                 },
      //                 {
      //                     label: 'Error',
      //                     icon: 'pi pi-fw pi-times-circle',
      //                     routerLink: ['/auth/error']
      //                 },
      //                 {
      //                     label: 'Access Denied',
      //                     icon: 'pi pi-fw pi-lock',
      //                     routerLink: ['/auth/access']
      //                 }
      //             ]
      //         }
      //     ]
      // },
      // {
      //     label: 'Get Started',
      //     items: [
      //         {
      //             label: 'Documentation',
      //             icon: 'pi pi-fw pi-book',
      //             routerLink: ['/documentation']
      //         },
      //         {
      //             label: 'View Source',
      //             icon: 'pi pi-fw pi-github',
      //             url: 'https://github.com/primefaces/sakai-ng',
      //             target: '_blank'
      //         }
      //     ]
      // }
    ]);
  }
}