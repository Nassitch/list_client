import { Injectable } from '@angular/core';import { ToastComponent } from '../components/toast/toast.component';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private toastComponent!: ToastComponent;

  setToastComponent(toastComponent: ToastComponent): void {
    this.toastComponent = toastComponent;
  }

  success(message: string): void {
    this.toastComponent.showToast(message, 'Succès', 'success');
  }

  error(message: string): void {
    this.toastComponent.showToast(message, 'Erreur', 'error');
  }
}
