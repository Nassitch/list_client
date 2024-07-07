import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-setting-window',
  templateUrl: './setting-window.component.html',
  styleUrl: './setting-window.component.css'
})
export class SettingWindowComponent {

  @Output()
  closeWindow: EventEmitter<boolean> = new EventEmitter<boolean>();

  close(): void {
    this.closeWindow.emit();
  }
}
