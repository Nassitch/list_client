import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fullDateFormat',
  standalone: true,
})
export class FullDateFormatPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return '';

    const date: Date = new Date(value);
    const day: number = date.getDate();
    const month: number = date.getMonth() + 1;
    const year: number = date.getFullYear();
    const hours: number = date.getHours();
    const minutes: number = date.getMinutes();

    const formattedDate: string = `${day.toString().padStart(2, '0')}.${month.toString().padStart(2, '0')}.${year} à ${hours.toString().padStart(2, '0')}h${minutes.toString().padStart(2, '0')}`;

    return formattedDate;
  }

}
