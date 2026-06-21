import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WorksEditPageFacadeService } from '@billing/services/works';
import { map, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { AppInputFormError, AppLoader } from '@shared/components';

@Component({
  selector: 'billing-works-edit',
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
    AppLoader,
    AppInputFormError
  ],
  templateUrl: './works-edit.html',
  styleUrl: './works-edit.css',
  providers:[WorksEditPageFacadeService]
})
export class WorksEdit implements OnInit, OnDestroy {

  readonly worksEditPageFacadeService = inject(WorksEditPageFacadeService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly subs: Subscription = new Subscription();

  ngOnInit(): void {
    this.getWorkIdFromRoute();
  }

  ngOnDestroy(): void {
   this.subs.unsubscribe();
  }

  private getWorkIdFromRoute() : void {
    this.subs.add(this.activatedRoute.paramMap
    .pipe(
      map(params => {
        const id = params.get('id');

        if (!id || isNaN(Number(id))) throw new Error();

        return Number(id);
      })
    )
    .subscribe({
      next: (id: number) => {
        this.worksEditPageFacadeService.init(id);
      },
      error: () => this.worksEditPageFacadeService.goBack()
    }));
  }
}
