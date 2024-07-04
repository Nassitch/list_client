import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signin/signup.component';
import { SubmitBtnComponent } from '../shared-components/components/submit-btn/submit-btn.component';
import { InputComponent } from '../shared-components/components/input/input.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './components/register/register.component';


@NgModule({
  declarations: [
    LoginComponent,
    SignupComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    AuthRoutingModule,
    FormsModule,
    SubmitBtnComponent,
    InputComponent
  ]
})
export class AuthModule { }
