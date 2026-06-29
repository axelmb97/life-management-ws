import { CommonModule } from '@angular/common';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BillingsEditPageFacadeService } from "@billing/services/billings";
import { AppLoader, AppInputFormError } from '@shared/components';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DatePickerModule } from 'primeng/datepicker';
import { DialogModule } from 'primeng/dialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { SelectModule } from 'primeng/select';
import { TagModule } from 'primeng/tag';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { map, Subscription } from 'rxjs';
@Component({
  selector: 'billing-billings-edit',
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
    DatePickerModule,
    IconFieldModule,
    ConfirmDialogModule,
    ReactiveFormsModule,
    AppLoader,
    AppInputFormError
  ],
  providers: [BillingsEditPageFacadeService],
  templateUrl: './billings-edit.html',
  styleUrl: './billings-edit.css',
})
export class BillingsEdit implements OnInit, OnDestroy{
  readonly billingsEditPageFacadeService = inject(BillingsEditPageFacadeService);
  private readonly activatedRoute = inject(ActivatedRoute);
  private readonly subs: Subscription = new Subscription();

  ngOnInit(): void {
    this.getBillingsIdFromRoute();
  }

  ngOnDestroy(): void {
   this.subs.unsubscribe();
  }

  private getBillingsIdFromRoute() : void {
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
        this.billingsEditPageFacadeService.init(id);
      },
      error: () => this.billingsEditPageFacadeService.goBack()
    }));
  }
}
