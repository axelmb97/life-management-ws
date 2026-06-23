import { inject, Injectable } from "@angular/core";
import { ConfirmationService } from "primeng/api";
import { ConfirmDialogData } from "@shared/models";

@Injectable({
  providedIn: 'root'
})
export class ConfirmDialogHandlerService {
  private confirmationService = inject(ConfirmationService);

  private DEFAULT_REJECT_BTN_TITLE = 'Cancel';
  private DEFAULT_ACCEPT_BTN_TITLE = 'Aceptar';

  showDialog(data: ConfirmDialogData) {
    this.confirmationService.confirm({
      message: data.message,
      header: data.title ?? "Danger Zone",
      icon: 'pi pi-info-circle',
      rejectLabel: data.rejectBtnTitle ?? this.DEFAULT_REJECT_BTN_TITLE,
      rejectButtonProps: {
          label: data.rejectBtnTitle ?? this.DEFAULT_REJECT_BTN_TITLE,
          severity: 'secondary',
          outlined: true
      },
      acceptLabel: data.acceptBtnTitle ?? this.DEFAULT_ACCEPT_BTN_TITLE,
      acceptButtonProps: {
          label: data.acceptBtnTitle ?? this.DEFAULT_ACCEPT_BTN_TITLE,
          severity: 'danger'
      },
  
      accept: () => {
        data.acceptFn();
      },
      reject: () => {
        if (!data.rejectFn) return;
        data.rejectFn();
      }
    });
  }
}