import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StyleClassModule } from 'primeng/styleclass';
import { LayoutService } from '../services/layout.service';

@Component({
  selector: 'app-topbar',
  imports: [RouterModule, CommonModule, StyleClassModule],
  templateUrl: './app-topbar.html',
  styleUrl: './app-topbar.css'
})
export class AppTopbar {
  readonly layoutService = inject(LayoutService);

  toggleDarkMode(): void {
    this.layoutService.toggleDarkMode();
  }
}
