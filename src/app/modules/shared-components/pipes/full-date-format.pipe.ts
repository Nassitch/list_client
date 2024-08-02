import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'fullDateFormat',
  standalone: true,
})
export class FullDateFormatPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return '';

    const date = new Date(value);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const formattedDate = `${day.toString().padStart(2, '0')}.${month.toString().padStart(2, '0')}.${year} à ${hours.toString().padStart(2, '0')}h${minutes.toString().padStart(2, '0')}`;

    return formattedDate;
  }

}
