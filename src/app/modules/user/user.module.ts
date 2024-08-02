import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { SettingProfileComponent } from './components/setting-profile/setting-profile.component';
import { InputComponent } from '../shared-components/components/input/input.component';
import { SubmitBtnComponent } from '../shared-components/components/submit-btn/submit-btn.component';
import { DateFormatPipe } from '../shared-components/pipes/date-format.pipe';
import { ConfirmModalComponent } from '../shared-components/components/confirm-modal/confirm-modal.component';
import { LoaderComponent } from '../shared-components/components/loader/loader.component';


@NgModule({
  declarations: [
    SettingProfileComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    LoaderComponent,
    InputComponent,
    SubmitBtnComponent,
    DateFormatPipe,
    ConfirmModalComponent
  ]
})
export class UserModule { }
