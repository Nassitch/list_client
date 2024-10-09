import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormatTicket',
  standalone: true,
})
export class DateFormatTicketPipe implements PipeTransform {
  transform(value: string): string {
    if (!value) return '';

    const date: Date = new Date(value);

    const day: string = date.getDate().toString().padStart(2, '0');
    const hours: string = date.getHours().toString().padStart(2, '0');
    const minutes: string = date.getMinutes().toString().padStart(2, '0');

    if (minutes === '00') {
      return `le ${day} à ${hours}h`;
    } else {
      return `le ${day} à ${hours}h${minutes}`;
    }
  }
}
