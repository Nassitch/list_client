import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceRoutingModule } from './invoice-routing.module';
import { InvoiceComponent } from './components/invoice/invoice.component';
import { CardComponent } from '../shared-components/components/card/card.component';
import { FormsModule } from '@angular/forms';
import { SubmitBtnComponent } from '../shared-components/components/submit-btn/submit-btn.component';
import { ConfirmModalComponent } from '../shared-components/components/confirm-modal/confirm-modal.component';
import { LoaderComponent } from '../shared-components/components/loader/loader.component';


@NgModule({
  declarations: [
    InvoiceComponent
  ],
  imports: [
    CommonModule,
    InvoiceRoutingModule,
    FormsModule,
    LoaderComponent,
    CardComponent,
    SubmitBtnComponent,
    ConfirmModalComponent
  ]
})
export class InvoiceModule { }
