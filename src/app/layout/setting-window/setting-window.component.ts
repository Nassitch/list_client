import { Component, EventEmitter, inject, Output } from '@angular/core';
import { AuthService } from '../../modules/auth/shared/services/auth.service';

@Component({
  selector: 'app-setting-window',
  templateUrl: './setting-window.component.html',
  styleUrl: './setting-window.component.css'
})
export class SettingWindowComponent {
  @Output()
  closeWindow: EventEmitter<boolean> = new EventEmitter<boolean>();

  private authService = inject(AuthService);

  logout(): void {
    this.authService.logout();
  }

  close(): void {
    this.closeWindow.emit();
  }
}
