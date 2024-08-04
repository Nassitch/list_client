import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { HowItWorksPageComponent } from './components/how-it-works-page/how-it-works-page.component';
import { CreditPageComponent } from './components/credit-page/credit-page.component';
import { userGuard } from './core/guards/user.guard';
import { adminGuard } from './core/guards/admin.guard';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { mobileGuard } from './core/guards/mobile.guard';

const routes: Routes = [
  {path: '', loadChildren: () => import("./modules/auth/auth.module").then((m) => m.AuthModule), canActivateChild: [mobileGuard]},
  {path: 'admin', loadChildren: () => import("./modules/admin/admin.module").then((m) => m.AdminModule), canActivateChild: [mobileGuard, adminGuard]},
  {path: 'user', loadChildren: () => import("./modules/user/user.module").then((m) => m.UserModule), canActivateChild: [mobileGuard, userGuard]},
  {path: 'search', loadChildren: () => import("./modules/search/search.module").then((m) => m.SearchModule), canActivateChild: [mobileGuard, userGuard]},
  {path: 'shop', loadChildren: () => import("./modules/shop/shop.module").then((m) => m.ShopModule), canActivateChild: [mobileGuard, userGuard]},
  {path: 'invoice', loadChildren: () => import("./modules/invoice/invoice.module").then((m) => m.InvoiceModule), canActivateChild: [mobileGuard, userGuard]},
  {path: 'home', component: HomePageComponent, canActivateChild: [mobileGuard, userGuard]},
  {path: 'how-it-works', component: HowItWorksPageComponent, canActivateChild: [mobileGuard, userGuard]},
  {path: 'credits', component: CreditPageComponent, canActivateChild: [mobileGuard]},
  {path: 'landing-page', component: LandingPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
