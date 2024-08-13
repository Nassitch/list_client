import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CookieService {
  setCookie(
    name: string,
    value: string,
    days: number,
    secure: boolean = true,
    sameSite: 'Lax' | 'Strict' | 'None' = 'Lax',
    path: string = '/'
  ): void {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = 'expires=' + date.toUTCString();
    let cookieString = `${name}=${value};${expires};path=${path};SameSite=${sameSite}`;

    if (secure) {
      cookieString += ';Secure';
    }

    document.cookie = cookieString;
  }

  getCookie(name: string): string | null {
    const nameEQ = name + '=';
    const ca = document.cookie.split(';');
    for (let i: number = 0; i < ca.length; i += 1) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) {
        return c.substring(nameEQ.length, c.length);
      }
    }
    return null;
  }

  deleteCookie(name: string, path: string = '/'): void {
    this.setCookie(name, '', -1, true, 'Lax', path);
  }
}
