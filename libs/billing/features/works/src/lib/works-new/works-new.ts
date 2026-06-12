import { CommonModule, JsonPipe } from '@angular/common';
import { Component, effect, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WorksNewPageFacadeService } from "@billing/services/works"
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { Router } from '@angular/router';
import { WorksRoutes } from '@shared/models';
import { AppInputFormError, AppLoader } from '@shared/components';

@Component({
  selector: 'billing-works-new',
  imports: [
    CommonModule,
    FormsModule,
    ButtonModule,
    RippleModule,
    ToastModule,
    ToolbarModule,
    RatingModule,
    InputTextModule,
    TextareaModule,
    SelectModule,
    RadioButtonModule,
    InputNumberModule,
    DialogModule,
    TagModule,
    InputIconModule,
    IconFieldModule,
    ConfirmDialogModule,
    ReactiveFormsModule,
    JsonPipe,
    AppLoader,
    AppInputFormError
  ],
  templateUrl: './works-new.html',
  styleUrl: './works-new.css',
  providers: [WorksNewPageFacadeService],
})
export class WorksNew implements OnInit{
  public readonly worksNewPageFacade  = inject(WorksNewPageFacadeService);
  private readonly router = inject(Router);
  
  private readonly successEffect = this.buildSuccessEffect();

  ngOnInit(): void {
    this.worksNewPageFacade.init();
  }

  private buildSuccessEffect()  {
    return effect(() => {
      const isSuccess = this.worksNewPageFacade.success();

      if (!isSuccess) return;

      this.goBack();
    });
  }

  goBack() : void {
    const queryRoute = `${WorksRoutes.Root}/${WorksRoutes.Query}`;
    this.router.navigate([queryRoute]);
  }
}
