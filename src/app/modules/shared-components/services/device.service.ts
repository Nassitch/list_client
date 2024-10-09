import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  isMobileDevice(): boolean {
    const userAgent: string = navigator.userAgent || navigator.vendor;
    return /android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent);
  }
}
