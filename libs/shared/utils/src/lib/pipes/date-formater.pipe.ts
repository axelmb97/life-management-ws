import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormatter',
  standalone: true
})
export class DateFormatterPipe implements PipeTransform {

  private readonly datePipe = new DatePipe('es-AR');
  private DEFAULT_VALUE = '-';
  transform(value: string | Date | null): unknown {
    if (!value) return this.DEFAULT_VALUE;

    return this.datePipe.transform(
      value,
      'dd/MM/yyyy'
    ) ?? this.DEFAULT_VALUE;;
  }

}