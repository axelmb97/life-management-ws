import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BillingsNewPageFacadeService } from "@billing/services/billings"
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
import { DatePickerModule } from 'primeng/datepicker';

@Component({
  selector: 'billing-billings-new',
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
    DatePickerModule,
    ConfirmDialogModule,
    ReactiveFormsModule,
    AppLoader,
    AppInputFormError
  ],
  providers: [BillingsNewPageFacadeService],
  templateUrl: './billings-new.html',
  styleUrl: './billings-new.css',
})
export class BillingsNew implements OnInit{
  readonly billingsNewPageFacadeService = inject(BillingsNewPageFacadeService);

  ngOnInit(): void {
    this.billingsNewPageFacadeService.init();
  }
}
