import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, EventEmitter, Output } from '@angular/core';


@Component({
  selector: 'app-confirm-modal',
  standalone: true,
  imports: [],
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.css'],
  animations: [
    trigger('modalAnimation', [
      state('void', style({
        opacity: 0.5,
        transform: 'translateY(-50%)'
      })),
      state('*', style({
        opacity: 1,
        transform: 'translateY(0)'
      })),
      transition('void => *', [
        animate('300ms ease-in')
      ]),
      transition('* => void', [
        animate('300ms ease-out')
      ])
    ])
  ]
})
export class ConfirmModalComponent {

  @Output() response = new EventEmitter<{ confirmed: boolean, action: 'save' | 'delete' }>();

  visibility: boolean = false;
  action!: 'save' | 'delete';

  public saveAction(): void {
    this.visibility = true;
    this.action = 'save';
  }
  
  public deleteAction(): void {
    this.visibility = true;
    this.action = 'delete';
  }
  
  protected onConfirm(): void {
    this.visibility = false;
    this.response.emit({ confirmed: true, action: this.action });
  }
  
  protected onCancel(): void {
    this.visibility = false;
    this.response.emit({ confirmed: false, action: this.action });
  }

}