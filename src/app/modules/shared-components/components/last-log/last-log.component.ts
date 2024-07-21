import { Component, Input } from '@angular/core';
import { DateFormatPipe } from '../../pipes/date-format.pipe';

@Component({
  selector: 'app-last-log',
  standalone: true,
  imports: [DateFormatPipe],
  templateUrl: './last-log.component.html',
  styleUrl: './last-log.component.css'
})
export class LastLogComponent {

  @Input() lastLog!: string;
}
