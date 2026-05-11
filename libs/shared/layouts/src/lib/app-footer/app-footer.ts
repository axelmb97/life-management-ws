import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `<div class="layout-footer">
    SAKAI by
    <a
      href="https://primeng.org"
      target="_blank"
      rel="noopener noreferrer"
      class="layout-footer-link"
      >PrimeNG</a
    >
  </div>`,
  styleUrl: './app-footer.css',
})
export class AppFooter {}
