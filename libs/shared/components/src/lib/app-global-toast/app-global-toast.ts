import { Component, inject } from '@angular/core';
import { ToastModule } from 'primeng/toast';
import { GlobalToastHandlerService } from '@shared/services';

@Component({
  selector: 'app-global-toast',
  imports: [ToastModule],
  templateUrl: './app-global-toast.html',
  styleUrl: './app-global-toast.css',
})
export class AppGlobalToast {
  private readonly globalToastHandler = inject(GlobalToastHandlerService);


}
