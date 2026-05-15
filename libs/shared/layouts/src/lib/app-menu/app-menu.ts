import { CommonModule } from '@angular/common';
import { Component, computed, inject, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AppMenuItem } from '../app-menu-item/app-menu-item';
import { AuthFacade } from '@states/authentication';

@Component({
  selector: 'app-menu',
  imports: [CommonModule, RouterModule, AppMenuItem],
  templateUrl: './app-menu.html',
  styleUrl: './app-menu.css',
})
export class AppMenu implements OnInit {

  readonly authFacade = inject(AuthFacade);
  readonly items = computed(() => this.authFacade.options$());

  ngOnInit(): void {
    this.authFacade.searchOptions();
  }
}
