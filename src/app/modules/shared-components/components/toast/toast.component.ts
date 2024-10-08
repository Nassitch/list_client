import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ToastService } from '../../services/toast.service';
import { CommonModule } from '@angular/common';
import {ToastType} from "../../../../models/toast.interface";

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.css'],
  animations: [
    trigger('toastAnimation', [
      state('void', style({
        opacity: 0,
        transform: 'translateY(-100%)'
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
export class ToastComponent implements OnInit {

  public toasts: ToastType[] = [];

  constructor(private toastService: ToastService) { }

  ngOnInit(): void {
    this.toastService.setToastComponent(this);
  }

  showToast(message: string, title: string, type: string): void {
    this.toasts.push({ message, title, type });
    setTimeout(() => this.removeToast(this.toasts[0]), 3000);
  }

  removeToast(toast: ToastType): void {
    this.toasts = this.toasts.filter(t => t !== toast);
  }
}
