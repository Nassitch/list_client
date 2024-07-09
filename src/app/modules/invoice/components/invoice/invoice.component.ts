import { Component } from '@angular/core';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.css'
})
export class InvoiceComponent {

  imgContent: string = '../../../../../assets/icons/bin.svg';
  count: number = 5;
  name: string = 'Carrefour';
  subName: string = 'Super marché';
}
