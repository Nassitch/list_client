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
import { DateFormatPipe } from './modules/shared-components/pipes/date-format.pipe';
import { LandingMsgComponent } from './modules/shared-components/components/landing-msg/landing-msg.component';
import { LastLogComponent } from './modules/shared-components/components/last-log/last-log.component';
import { HowItWorksPageComponent } from './components/how-it-works-page/how-it-works-page.component';
import { HowItWorksCardComponent } from './modules/shared-components/components/how-it-works-card/how-it-works-card.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SettingWindowComponent,
    LandingPageComponent,
    CreditPageComponent,
    HowItWorksPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    ToastComponent,
    LandingMsgComponent,
    LastLogComponent,
    DateFormatPipe,
    HowItWorksCardComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
