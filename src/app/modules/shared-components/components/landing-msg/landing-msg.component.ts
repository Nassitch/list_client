import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-landing-msg',
  standalone: true,
  imports: [],
  templateUrl: './landing-msg.component.html',
  styleUrl: './landing-msg.component.css'
})
export class LandingMsgComponent {

  @Input() title!: string;
  @Input() description!: string;

  display: boolean = true;

  close(): boolean {
    return this.display = !this.display;
  }
}
