import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  Component,
  computed,
  inject,
  input,
  signal,
} from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { RippleModule } from 'primeng/ripple';
import { filter } from 'rxjs/operators';
import { LayoutService } from '../services/layout.service';

@Component({
  selector: 'app-menu-item',
  imports: [CommonModule, RouterModule, RippleModule],
  templateUrl: './app-menu-item.html',
  styleUrl: './app-menu-item.css',
  host: {
    '[class.active-menuitem]': 'isActive()',
    '[class.layout-root-menuitem]': 'root()',
  },
})
export class AppMenuItem implements AfterViewInit {
  readonly layoutService = inject(LayoutService);
  private readonly router = inject(Router);

  readonly item = input<any>({});
  readonly root = input<boolean>(false);
  readonly parentPath = input<string | null>(null);

  readonly isVisible = computed(() => this.item()?.visible !== false);
  readonly hasChildren = computed(
    () => this.item()?.items && this.item()?.items.length > 0
  );
  readonly hasRouterLink = computed(() => !!this.item()?.routerLink);

  readonly fullPath = computed(() => {
    const itemPath = this.item()?.path;
    if (!itemPath) return this.parentPath();
    const parent = this.parentPath();
    if (parent && !itemPath.startsWith(parent)) {
      return `${parent}${itemPath}`;
    }
    return itemPath;
  });

  readonly isActive = computed(() => {
    const activePath = this.layoutService.layoutState().activePath;
    if (this.item()?.path) {
      return activePath?.startsWith(this.fullPath() ?? '') ?? false;
    }
    return false;
  });

  readonly initialized = signal(false);

  constructor() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        if (this.item()?.routerLink) {
          this.updateActiveStateFromRoute();
        }
      });
  }

  ngOnInit(): void {
    if (this.item()?.routerLink) {
      this.updateActiveStateFromRoute();
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.initialized.set(true));
  }

  itemClick(event: Event): void {
    const item = this.item();
    if (item?.disabled) {
      event.preventDefault();
      return;
    }

    if (item?.command) {
      item.command({ originalEvent: event, item });
    }

    if (this.hasChildren()) {
      this.layoutService.layoutState.update((state) => ({
        ...state,
        activePath: this.isActive() ? this.parentPath() : this.fullPath(),
        menuHoverActive: !this.isActive(),
      }));
      return;
    }

    this.layoutService.layoutState.update((state) => ({
      ...state,
      overlayMenuActive: false,
      mobileMenuActive: false,
      menuHoverActive: false,
      activePath: this.fullPath() ?? state.activePath,
    }));
  }

  private updateActiveStateFromRoute(): void {
    const item = this.item();
    if (!item?.routerLink) return;
    const firstLink = Array.isArray(item.routerLink)
      ? item.routerLink[0]
      : item.routerLink;
    const isRouteActive = this.router.isActive(firstLink, {
      paths: 'exact',
      queryParams: 'ignored',
      matrixParams: 'ignored',
      fragment: 'ignored',
    });
    if (isRouteActive && this.parentPath()) {
      this.layoutService.layoutState.update((state) => ({
        ...state,
        activePath: this.parentPath(),
      }));
    }
  }
}
