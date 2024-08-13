import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { DeviceService } from '../../services/device.service';
import { StorageService } from '../../../../core/services/storage.service';

@Component({
  selector: 'app-install-app',
  standalone: true,
  imports: [],
  templateUrl: './install-app.component.html',
  styleUrl: './install-app.component.css',
})
export class InstallAppComponent implements OnInit {
  @Output() closeWindow: EventEmitter<boolean> = new EventEmitter<boolean>();

  private storageService = inject(StorageService);

  deferredPrompt: any;

  // ngOnInit(): void {
  //   window.addEventListener('beforeinstallprompt', (e: any) => {
  //     console.log('beforeinstallprompt event captured');  // Ajout d'un journal
  //     e.preventDefault();
  //     this.deferredPrompt = e;
  //   });
  // }

  ngOnInit(): void {
    window.addEventListener('beforeinstallprompt', (e: any) => {
      console.log('beforeinstallprompt event captured:', e);
      e.preventDefault();
      this.deferredPrompt = e;
      console.log('Deferred Prompt stored:', this.deferredPrompt);
    });
  }
  
  installPWA(): void {
    if (!this.deferredPrompt) {
      console.log('PWA installation prompt not available.');  // Journal si l'événement n'est pas capturé
      return;
    }
    this.deferredPrompt.prompt();
    this.deferredPrompt.userChoice.then((choiceResult: any) => {
      if (choiceResult.outcome === 'accepted') {
        this.storageService.setItem('installed', true);
        console.log('User accepted the PWA install prompt');
      } else {
        console.log('User dismissed the PWA install prompt');
      }
      this.deferredPrompt = null;
    });
  }

  close(): void {
    this.closeWindow.emit(false);
  }
}