import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { ToastComponent } from './modules/shared-components/components/toast/toast.component';
import { HeaderComponent } from './layout/header/header.component';
import { SettingWindowComponent } from './layout/setting-window/setting-window.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { CreditPageComponent } from './components/credit-page/credit-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SettingWindowComponent,
    LandingPageComponent,
    CreditPageComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ToastComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
