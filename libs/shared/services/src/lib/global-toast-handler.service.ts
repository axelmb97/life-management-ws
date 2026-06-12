import { inject, Injectable } from "@angular/core";
import { ToastData } from "@shared/models";
import { MessageService } from "primeng/api";

@Injectable({
  providedIn: 'root'
})
export class GlobalToastHandlerService {
  private readonly messageService = inject(MessageService);
  private readonly MESSAGE_LIFE: number = 3000;

  showError(data: ToastData) : void {
    this.messageService.add({
      life: this.MESSAGE_LIFE,
      severity: 'error',
      summary: data.title ?? 'Error',
      detail: data.message
    });
  }

  showSuccess(data: ToastData) : void {
    this.messageService.add({
      life: this.MESSAGE_LIFE,
      severity: 'success',
      summary: data.title ?? 'Éxito',
      detail: data.message
    });
  }
}