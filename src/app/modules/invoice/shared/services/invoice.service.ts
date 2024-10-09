import { inject, Injectable } from '@angular/core';
import { UserService } from '../../../user/shared/services/user.service';
import { HttpClient } from '@angular/common/http';
import { Invoice } from '../../models/invoice.class';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment.developpment';
import { InvoiceResponse } from '../../models/invoice-response.interface';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  private http: HttpClient = inject(HttpClient);
  private userService: UserService = inject(UserService);

  private readonly _BASE_URL: string = environment._BASE_URL;
  private readonly _USER: string = environment._USER;
  private readonly _INVOICE: string = environment._INVOICE;
  private readonly _READ: string = environment._READ;
  private readonly _CREATE: string = environment._CREATE;

  getInvoiceByUserId$(): Observable<InvoiceResponse[]> {
    this.userService.initialize();
    return this.http.get<InvoiceResponse[]>(`${this._BASE_URL}${this._USER}${this._INVOICE}${this._READ}/${this.userService.id}`);
  }

  addInvoice$(total: number, marketId: number, shopId: number): Observable<Invoice> {
    this.userService.initialize();
    const invoice: Invoice = new Invoice(total, marketId, shopId, this.userService.id);
    return this.http.post<Invoice>(`${this._BASE_URL}${this._USER}${this._INVOICE}${this._CREATE}`, invoice);
  }
}
