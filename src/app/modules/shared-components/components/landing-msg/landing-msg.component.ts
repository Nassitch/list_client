import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-landing-msg',
  standalone: true,
  imports: [],
  templateUrl: './landing-msg.component.html',
  styleUrl: './landing-msg.component.css'
})
export class LandingMsgComponent {

  @Input() public title!: string;
  @Input() public description!: string;
  @Input() public additionalOne?: string;
  @Input() public additionalTwo?: string;

  display: boolean = true;

  close(): boolean {
    return this.display = !this.display;
  }
}
