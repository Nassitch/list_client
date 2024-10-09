import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-submit-btn',
  standalone: true,
  imports: [],
  templateUrl: './submit-btn.component.html',
  styleUrl: './submit-btn.component.css'
})
export class SubmitBtnComponent {
  @Input() text: string = 'Enregistrer';
  @Output() buttonClick: EventEmitter<void> = new EventEmitter<void>();

  onClick(): void {
    this.buttonClick.emit();
  }
}
