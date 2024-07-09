import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { SettingProfileComponent } from './components/setting-profile/setting-profile.component';
import { InputComponent } from '../shared-components/components/input/input.component';
import { SubmitBtnComponent } from '../shared-components/components/submit-btn/submit-btn.component';
import { DateFormatPipe } from '../shared-components/pipes/date-format.pipe';


@NgModule({
  declarations: [
    SettingProfileComponent,
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    InputComponent,
    SubmitBtnComponent,
    DateFormatPipe
  ]
})
export class UserModule { }
