import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat',
  standalone: true,
})
export class DateFormatPipe implements PipeTransform {
  transform(value: string): string {
    const date: Date = new Date(value);
    const today: Date = new Date();
    const yesterday: Date = new Date(today);
    yesterday.setDate(today.getDate() - 1);

    const isToday: boolean =
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear();

    const isYesterday: boolean =
      date.getDate() === yesterday.getDate() &&
      date.getMonth() === yesterday.getMonth() &&
      date.getFullYear() === yesterday.getFullYear();

    if (isToday) {
      return "aujourd'hui";
    }

    if (isYesterday) {
      return 'hier';
    }

    const day: string = ('0' + date.getDate()).slice(-2);
    const month: string = ('0' + (date.getMonth() + 1)).slice(-2);
    const year: number = date.getFullYear();

    return `${day}.${month}.${year}`;
  }
}
