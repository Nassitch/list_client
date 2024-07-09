import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceRoutingModule } from './invoice-routing.module';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { CardComponent } from '../shared-components/components/card/card.component';


@NgModule({
  declarations: [
    InvoiceComponent
  ],
  imports: [
    CommonModule,
    InvoiceRoutingModule,
    CardComponent
  ]
})
export class InvoiceModule { }
