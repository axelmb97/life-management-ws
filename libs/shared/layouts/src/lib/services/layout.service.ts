import { Injectable, computed, signal } from '@angular/core';

export interface LayoutConfig {
  preset: string;
  primary: string;
  surface: string | undefined | null;
  darkTheme: boolean;
  menuMode: 'static' | 'overlay';
}

interface LayoutState {
  staticMenuDesktopInactive: boolean;
  overlayMenuActive: boolean;
  configSidebarVisible: boolean;
  staticMenuMobileActive: boolean;
  mobileMenuActive: boolean;
  menuHoverActive: boolean;
  activePath: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  readonly layoutConfig = signal<LayoutConfig>({
    preset: 'Aura',
    primary: 'emerald',
    surface: null,
    darkTheme: false,
    menuMode: 'static',
  });

  readonly layoutState = signal<LayoutState>({
    staticMenuDesktopInactive: false,
    overlayMenuActive: false,
    configSidebarVisible: false,
    staticMenuMobileActive: false,
    mobileMenuActive: false,
    menuHoverActive: false,
    activePath: null,
  });

  readonly isSidebarActive = computed(
    () =>
      this.layoutState().overlayMenuActive || this.layoutState().mobileMenuActive
  );
  readonly isDarkTheme = computed(() => this.layoutConfig().darkTheme);
  readonly isOverlay = computed(() => this.layoutConfig().menuMode === 'overlay');

  toggleDarkMode(): void {
    this.layoutConfig.update((state) => ({
      ...state,
      darkTheme: !state.darkTheme,
    }));
    this.applyDarkModeClass();
  }

  applyDarkModeClass(): void {
    if (this.layoutConfig().darkTheme) {
      document.documentElement.classList.add('app-dark');
    } else {
      document.documentElement.classList.remove('app-dark');
    }
  }

  onMenuToggle(): void {
    if (this.isOverlay()) {
      this.layoutState.update((prev) => ({
        ...prev,
        overlayMenuActive: !prev.overlayMenuActive,
      }));
    }

    if (this.isDesktop()) {
      this.layoutState.update((prev) => ({
        ...prev,
        staticMenuDesktopInactive: !prev.staticMenuDesktopInactive,
      }));
    } else {
      this.layoutState.update((prev) => ({
        ...prev,
        mobileMenuActive: !prev.mobileMenuActive,
      }));
    }
  }

  showConfigSidebar(): void {
    this.layoutState.update((prev) => ({ ...prev, configSidebarVisible: true }));
  }

  hideConfigSidebar(): void {
    this.layoutState.update((prev) => ({ ...prev, configSidebarVisible: false }));
  }

  isDesktop(): boolean {
    return window.innerWidth > 991;
  }
}
