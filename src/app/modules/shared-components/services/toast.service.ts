import { Injectable } from '@angular/core';import { ToastComponent } from '../components/toast/toast.component';
;

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private toastComponent!: ToastComponent;

  constructor() { }

  setToastComponent(toastComponent: ToastComponent) {
    this.toastComponent = toastComponent;
  }

  show(message: string, title: string, type: string) {
    this.toastComponent.showToast(message, title, type);
  }
}