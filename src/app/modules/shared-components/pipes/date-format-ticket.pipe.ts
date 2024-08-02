import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormatTicket',
  standalone: true,
})
export class DateFormatTicketPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';

    const date = new Date(value);

    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    if (minutes === '00') {
      return `le ${day} à ${hours}h`;
    } else {
      return `le ${day} à ${hours}h${minutes}`;
    }
  }
}
