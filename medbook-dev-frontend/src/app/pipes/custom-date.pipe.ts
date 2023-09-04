import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'customDatePipe',
})
export class CustomDatePipe implements PipeTransform {
  constructor(private datePipe: DatePipe) {}

  transform(value: any, format: string = 'dd/MM/yyyy'): any {
    if (value instanceof Date) {
      return this.datePipe.transform(value, format);
    }
    return value;
  }
}
