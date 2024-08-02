import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DateFormatTicketPipe } from '../../pipes/date-format-ticket.pipe';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [CommonModule, DateFormatTicketPipe],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css'
})
export class TicketComponent {

  @Input() public id!: number;
  @Input() public date!: string;
  @Input() public count!: number;
  @Input() public image!: string;
  @Input() public total!: number;
}
