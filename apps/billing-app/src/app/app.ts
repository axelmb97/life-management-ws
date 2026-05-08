import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { NxWelcome } from './nx-welcome';

@Component({
  imports: [NxWelcome, RouterModule, ButtonModule, DialogModule],
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected title = 'billing-app';
  protected isDialogVisible = false;

  protected openDialog(): void {
    this.isDialogVisible = true;
  }

  protected closeDialog(): void {
    this.isDialogVisible = false;
  }
}
