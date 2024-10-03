import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { AuthService } from '../../modules/auth/shared/services/auth.service';
import { AdminService } from '../../modules/admin/shared/services/admin.service';

@Component({
  selector: 'app-setting-window',
  templateUrl: './setting-window.component.html',
  styleUrl: './setting-window.component.css'
})
export class SettingWindowComponent implements OnInit {
  @Output() openWindow: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() closeWindow: EventEmitter<boolean> = new EventEmitter<boolean>();

  private adminService = inject(AdminService);
  private authService = inject(AuthService);

  isUser: boolean = true;
  isInstalled: boolean = false;

  ngOnInit(): void {
    this.adminService.initializeUserRole();
    const role = this.adminService.currentUserRole$.getValue();
    if (role === 'ROLE_ADMIN') {
      this.isUser = false;
    }
  }

  logout(): void {
    this.authService.logout();
  }

  open(): void {
    this.openWindow.emit(true);
    this.closeWindow.emit();
  }

  close(): void {
    this.closeWindow.emit();
  }
}
