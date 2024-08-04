import { Component, inject, OnInit } from '@angular/core';
import { ImageService } from '../../../shared-components/services/image.service';
import { InvoiceService } from '../../shared/services/invoice.service';
import { BehaviorSubject, map, Observable, switchMap, tap } from 'rxjs';
import { InvoiceResponse } from '../../models/invoice-response.interface';
import { StatisticService } from '../../../shared-components/services/statistic.service';
import { Statistic } from '../../../shared-components/models/statistic.interface';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrl: './history.component.css'
})
export class HistoryComponent implements OnInit {
  private refreshInvoice$ = new BehaviorSubject<void>(undefined);
  private refreshSatistics$ = new BehaviorSubject<void>(undefined);

  private invoiceService = inject(InvoiceService);
  private statService = inject(StatisticService);
  public imageService = inject(ImageService);

  invoiceList$!: Observable<{ [year: string]: { [month: string]: InvoiceResponse[] } }>;
  statistics$!: Observable<Statistic>;

  year: number = new Date().getFullYear();
  currentYear: number = this.year;

  ngOnInit(): void {
    this.invoiceList$ = this.refreshInvoice$.pipe(
      switchMap(() => this.invoiceService.getInvoiceByUserId$()),
      map(invoiceList => this.groupByYearAndMonth(invoiceList.reverse())),
    );
    this.statistics$ = this.refreshSatistics$.pipe(
      switchMap(() => this.statService.getStatsByUserId$(this.currentYear))
    );
    this.refreshSatistics$.next();
  }

  yearNavigation(move: string): void {
    if (move === 'forward' && this.currentYear !== this.year) {
      this.currentYear += 1;
      this.refreshSatistics$.next();
    } else if (move === 'back') {
      this.currentYear -= 1;
      this.refreshSatistics$.next();
    } else {
      console.error("Le futur n'est pas visible.");
    }
  }

  private groupByYearAndMonth(invoices: InvoiceResponse[]): { [year: string]: { [month: string]: InvoiceResponse[] } } {
    return invoices.reduce((groupedInvoices, invoice) => {
      const date = new Date(invoice.createdAt);
      const year = date.getFullYear().toString();
      const month = date.toLocaleString('fr-FR', { month: 'long' });

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