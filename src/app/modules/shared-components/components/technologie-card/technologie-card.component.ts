import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-technologie-card',
  standalone: true,
  imports: [],
  templateUrl: './technologie-card.component.html',
  styleUrl: './technologie-card.component.css'
})
export class TechnologieCardComponent {

  @Input() public picture!: string;
  @Input() public title!: string;
  @Input() public version?: string;
  @Input() public link?: string;
  @Input() public secondLink?: string;

}
