import { Injectable } from '@angular/core';
import { ConfirmModalComponent } from '../components/confirm-modal/confirm-modal.component';

@Injectable({
  providedIn: 'root'
})
export class ConfirmModalService {

  private modalComponent!: ConfirmModalComponent;

  setModalComponent(modal: ConfirmModalComponent): void {
    this.modalComponent = modal;
  }

  save(): void {
    if (this.modalComponent) {
      this.modalComponent.saveAction();
    }
  }

  delete(): void {
    if (this.modalComponent) {
      this.modalComponent.deleteAction();
    }
  }
}
