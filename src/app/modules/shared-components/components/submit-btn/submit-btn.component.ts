import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-submit-btn',
  standalone: true,
  imports: [],
  templateUrl: './submit-btn.component.html',
  styleUrl: './submit-btn.component.css'
})
export class SubmitBtnComponent {

  @Input() text: string = "";
  @Input() onClick!: () => void;

  handleClick() {
    if (this.onClick) {
      this.onClick();
    }
  }
}
