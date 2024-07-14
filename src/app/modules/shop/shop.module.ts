import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { ShopManagerComponent } from './components/shop-manager/shop-manager.component';
import { LandingMsgComponent } from "../shared-components/components/landing-msg/landing-msg.component";
import { NewCardComponent } from '../shared-components/components/new-card/new-card.component';
import { CardComponent } from '../shared-components/components/card/card.component';
import { BasketComponent } from './components/basket/basket.component';
import { ListComponent } from '../shared-components/components/list/list.component';
import { TotalComponent } from '../shared-components/components/total/total.component';
import { SubmitBtnComponent } from '../shared-components/components/submit-btn/submit-btn.component';
import { FullDateFormatPipe } from '../shared-components/pipes/full-date-format.pipe';


@NgModule({
  declarations: [
    ShopManagerComponent,
    BasketComponent,
  ],
  imports: [
    CommonModule,
    ShopRoutingModule,
    LandingMsgComponent,
    NewCardComponent,
    CardComponent,
    ListComponent,
    TotalComponent,
    SubmitBtnComponent,
    FullDateFormatPipe
]
})
export class ShopModule { }
