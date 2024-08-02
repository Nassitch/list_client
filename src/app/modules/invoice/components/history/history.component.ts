import { Component, inject, OnInit } from '@angular/core';
import { ImageService } from '../../../shared-components/services/image.service';
import { InvoiceService } from '../../shared/services/invoice.service';
import { BehaviorSubject, map, Observable, switchMap, tap } from 'rxjs';
import { InvoiceResponse } from '../../models/invoice-response.interface';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent implements OnInit {
  private refreshInvoice$ = new BehaviorSubject<void>(undefined);

  private invoiceService = inject(InvoiceService);
  public imageService = inject(ImageService);

  invoiceList$!: Observable<{ [year: string]: { [month: string]: InvoiceResponse[] } }>;

  ngOnInit(): void {
    this.invoiceList$ = this.refreshInvoice$.pipe(
      switchMap(() => this.invoiceService.getInvoiceByUserId$()),
      map(invoiceList => this.groupByYearAndMonth(invoiceList.reverse())),
      tap(res => console.log(res))
    );
  }

  private groupByYearAndMonth(invoices: InvoiceResponse[]): { [year: string]: { [month: string]: InvoiceResponse[] } } {
    return invoices.reduce((groupedInvoices, invoice) => {
      const date = new Date(invoice.createdAt);
      const year = date.getFullYear().toString();
      const month = date.toLocaleString('fr-FR', { month: 'long'}); 

      if (!groupedInvoices[year]) {
        groupedInvoices[year] = {};
      }
      if (!groupedInvoices[year][month]) {
        groupedInvoices[year][month] = [];
      }
      groupedInvoices[year][month].push(invoice);
      return groupedInvoices;
    }, {} as { [year: string]: { [month: string]: InvoiceResponse[] } });
  }

  getKeys(obj: object): string[] {
    return Object.keys(obj).sort((a, b) => parseInt(b) - parseInt(a));
  }

  getMonthKeys(yearObj: { [month: string]: InvoiceResponse[] }): string[] {
    const monthOrder = ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'];
    return Object.keys(yearObj)
      .sort((a, b) => monthOrder.indexOf(b.toLowerCase()) - monthOrder.indexOf(a.toLowerCase()));
  }
}