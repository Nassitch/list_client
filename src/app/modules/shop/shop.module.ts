import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { ShopManagerComponent } from './components/shop-manager/shop-manager.component';
import { LandingMsgComponent } from "../shared-components/components/landing-msg/landing-msg.component";
import { NewCardComponent } from '../shared-components/components/new-card/new-card.component';
import { CardComponent } from '../shared-components/components/card/card.component';


@NgModule({
  declarations: [
    ShopManagerComponent
  ],
  imports: [
    CommonModule,
    ShopRoutingModule,
    LandingMsgComponent,
    NewCardComponent,
    CardComponent
]
})
export class ShopModule { }
