import { Component, computed, effect, input, signal } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { FormErrorList } from '@data-access/models';
import { merge, startWith } from 'rxjs';

@Component({
  selector: 'app-input-form-error',
  imports: [],
  templateUrl: './app-input-form-error.html',
  styleUrl: './app-input-form-error.css',
})
export class AppInputFormError {
  control = input.required<AbstractControl>();
  messages = input.required<FormErrorList>();

  private readonly controlVersion = signal(0);

  constructor() {
    effect((onCleanup) => {
      const control = this.control();

      const sub = merge(
        control.valueChanges,
        control.statusChanges,
        control.events,
      )
        .pipe(startWith(null))
        .subscribe(() => {
          this.controlVersion.update((v) => v + 1);
        });

      onCleanup(() => sub.unsubscribe());
    });
  }

  private readonly controlState = computed(() => {
    this.controlVersion();

    const control = this.control();
    return {
      errors: control.errors,
      touched: control.touched,
      invalid: control.invalid,
    };
  });

  readonly message = computed(() => {
    const errors = this.controlState().errors;
    if (!errors) {
      return '';
    }

    const key = Object.keys(errors)[0];
    const msg = this.messages()[key];
    if (!msg) {
      return '';
    }

    return typeof msg === 'function' ? msg(errors[key]) : msg;
  });

  readonly showError = computed(() => {
    const { touched, invalid } = this.controlState();

    return touched && invalid && this.message() !== '';
  });
}
