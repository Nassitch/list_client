import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { DashBoardComponent } from './components/dash-board/dash-board.component';
import { CategoryManagerComponent } from './components/category-manager/category-manager.component';
import { NewCardComponent } from '../shared-components/components/new-card/new-card.component';
import { CardComponent } from '../shared-components/components/card/card.component';
import { InputComponent } from '../shared-components/components/input/input.component';
import { SubmitBtnComponent } from '../shared-components/components/submit-btn/submit-btn.component';
import { FormsModule } from '@angular/forms';
import { MarketManagerComponent } from './components/market-manager/market-manager.component';
import { ItemManagerComponent } from './components/item-manager/item-manager.component';
import { UserPanelComponent } from './components/user-panel/user-panel.component';
import { LastLogComponent } from '../shared-components/components/last-log/last-log.component';
import { ConfirmModalComponent } from '../shared-components/components/confirm-modal/confirm-modal.component';
import { LoaderComponent } from '../shared-components/components/loader/loader.component';


@NgModule({
  declarations: [
    DashBoardComponent,
    CategoryManagerComponent,
    MarketManagerComponent,
    ItemManagerComponent,
    UserPanelComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    LastLogComponent,
    LoaderComponent,
    NewCardComponent,
    CardComponent,
    InputComponent,
    FormsModule,
    SubmitBtnComponent,
    ConfirmModalComponent
  ]
})
export class AdminModule { }
