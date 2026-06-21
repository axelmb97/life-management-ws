import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, Validators } from '@angular/forms';
import { AppInputFormError } from './app-input-form-error';

describe('AppInputFormError', () => {
  let fixture: ComponentFixture<AppInputFormError>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppInputFormError],
    }).compileComponents();

    fixture = TestBed.createComponent(AppInputFormError);
  });

  function setup(control: FormControl, messages: Record<string, string>) {
    fixture.componentRef.setInput('control', control);
    fixture.componentRef.setInput('messages', messages);
    fixture.detectChanges();
  }

  it('should not show an error when the control is valid', () => {
    setup(new FormControl('value'), { required: 'Required' });

    expect(fixture.nativeElement.textContent.trim()).toBe('');
  });

  it('should not show an error when the control is invalid but untouched', () => {
    setup(new FormControl('', Validators.required), { required: 'Required' });

    expect(fixture.nativeElement.textContent.trim()).toBe('');
  });

  it('should show the mapped message when the control is touched and invalid', () => {
    const control = new FormControl('', Validators.required);
    control.markAsTouched();
    setup(control, { required: 'This field is required' });

    expect(fixture.nativeElement.textContent.trim()).toBe('This field is required');
  });

  it('should show the error after markAsTouched without a value change', () => {
    const control = new FormControl('', Validators.required);
    setup(control, { required: 'Required' });

    control.markAsTouched();
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent.trim()).toBe('Required');
  });

  it('should hide the error when the control becomes valid', () => {
    const control = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]);
    control.markAsTouched();
    setup(control, {
      required: 'Required',
      minlength: 'Too short',
    });

    control.setValue('abc');
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent.trim()).toBe('');
  });

  it('should update the message when the error changes', () => {
    const control = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]);
    control.markAsTouched();
    setup(control, {
      required: 'Required',
      minlength: 'Too short',
    });

    control.setValue('a');
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent.trim()).toBe('Too short');
  });

  it('should show only the first error when multiple validators fail', () => {
    const control = new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]);
    control.markAsTouched();
    setup(control, {
      required: 'Required',
      minlength: 'Too short',
    });

    expect(fixture.nativeElement.textContent.trim()).toBe('Required');
  });

  it('should resolve function-based messages', () => {
    const control = new FormControl('ab', Validators.minLength(5));
    control.markAsTouched();
    setup(control, {
      minlength: (error) => `Minimum ${(error as { requiredLength: number }).requiredLength} characters`,
    });

    expect(fixture.nativeElement.textContent.trim()).toBe('Minimum 5 characters');
  });
});
