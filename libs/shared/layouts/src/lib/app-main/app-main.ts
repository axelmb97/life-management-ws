import { CommonModule } from '@angular/common';
import { Component, ViewEncapsulation, computed, effect, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppSidebar } from '../app-sidebar/app-sidebar';
import { AppTopbar } from '../app-topbar/app-topbar';
import { LayoutService } from '../services/layout.service';
import { AppGlobalToast } from '@shared/components';

@Component({
  selector: 'app-main',
  imports: [CommonModule, AppTopbar, AppSidebar, RouterModule, AppGlobalToast],
  templateUrl: './app-main.html',
  styleUrl: './app-main.css',
  encapsulation: ViewEncapsulation.None,
})
export class AppMain {
  readonly layoutService = inject(LayoutService);

  constructor() {
    effect(() => {
      const state = this.layoutService.layoutState();
      if (state.mobileMenuActive) {
        document.body.classList.add('blocked-scroll');
      } else {
        document.body.classList.remove('blocked-scroll');
      }
    });
  }

  readonly containerClass = computed(() => {
    const config = this.layoutService.layoutConfig();
    const state = this.layoutService.layoutState();
    return {
      'layout-overlay': config.menuMode === 'overlay',
      'layout-static': config.menuMode === 'static',
      'layout-static-inactive':
        state.staticMenuDesktopInactive && config.menuMode === 'static',
      'layout-overlay-active': state.overlayMenuActive,
      'layout-mobile-active': state.mobileMenuActive,
    };
  });
}
