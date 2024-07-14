import { inject, Injectable } from '@angular/core';
import { UserService } from '../../../user/shared/services/user.service';
import { HttpClient } from '@angular/common/http';
import { Invoice } from '../../models/invoice.class';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.developpment';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  private http = inject(HttpClient);
  private userService = inject(UserService);

  private _BASE_URL: string = environment._BASE_URL;
  private _USER: string = environment._USER;
  private _INVOICE: string = environment._INVOICE;
  private _CREATE: string = environment._CREATE;

  postInvoice$(total: number, marketId: number, shopId: number): Observable<Invoice> {
    this.userService.initialize();
    const invoice: Invoice = new Invoice(total, marketId, shopId, this.userService.id);
    return this.http.post<Invoice>(`${this._BASE_URL}${this._USER}${this._INVOICE}${this._CREATE}`, invoice);
  }
}
