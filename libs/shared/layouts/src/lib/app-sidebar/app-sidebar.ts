import { Component, ElementRef, OnDestroy, OnInit, effect, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter, Subject, takeUntil } from 'rxjs';
import { AppMenu } from '../app-menu/app-menu';
import { LayoutService } from '../services/layout.service';

@Component({
  selector: 'app-sidebar',
  imports: [AppMenu],
  templateUrl: './app-sidebar.html',
  styleUrl: './app-sidebar.css',
})
export class AppSidebar implements OnInit, OnDestroy {
  readonly layoutService = inject(LayoutService);
  private readonly router = inject(Router);
  private readonly el = inject(ElementRef<HTMLElement>);
  private outsideClickListener: ((event: MouseEvent) => void) | null = null;
  private readonly destroy$ = new Subject<void>();

  constructor() {
    effect(() => {
      const state = this.layoutService.layoutState();
      if (
        (this.layoutService.isDesktop() && state.overlayMenuActive) ||
        (!this.layoutService.isDesktop() && state.mobileMenuActive)
      ) {
        this.bindOutsideClickListener();
      } else {
        this.unbindOutsideClickListener();
      }
    });
  }

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe((event) => {
        const navEvent = event as NavigationEnd;
        this.onRouteChange(navEvent.urlAfterRedirects);
      });

    this.onRouteChange(this.router.url);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.unbindOutsideClickListener();
  }

  private closeMenu(): void {
    this.layoutService.layoutState.update((state) => ({
      ...state,
      overlayMenuActive: false,
      staticMenuMobileActive: false,
      mobileMenuActive: false,
      menuHoverActive: false,
    }));
  }

  private onRouteChange(path: string): void {
    this.layoutService.layoutState.update((state) => ({
      ...state,
      activePath: path,
      overlayMenuActive: false,
      staticMenuMobileActive: false,
      mobileMenuActive: false,
      menuHoverActive: false,
    }));
  }

  private bindOutsideClickListener(): void {
    if (this.outsideClickListener) return;
    this.outsideClickListener = (event: MouseEvent) => {
      if (!this.isInsideSidebar(event)) {
        this.closeMenu();
      }
    };
    document.addEventListener('click', this.outsideClickListener);
  }

  private unbindOutsideClickListener(): void {
    if (!this.outsideClickListener) return;
    document.removeEventListener('click', this.outsideClickListener);
    this.outsideClickListener = null;
  }

  private isInsideSidebar(event: MouseEvent): boolean {
    const sidebarEl = this.el.nativeElement;
    const menuButton = document.querySelector('.layout-menu-button');
    return (
      sidebarEl.contains(event.target as Node) ||
      menuButton?.contains(event.target as Node) === true
    );
  }
}
