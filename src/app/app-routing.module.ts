import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { HowItWorksPageComponent } from './components/how-it-works-page/how-it-works-page.component';
import { CreditPageComponent } from './components/credit-page/credit-page.component';
import { userGuard } from './core/guards/user.guard';
import { adminGuard } from './core/guards/admin.guard';

const routes: Routes = [
  {path: '', loadChildren: () => import("./modules/auth/auth.module").then((m) => m.AuthModule)},
  {path: 'admin', loadChildren: () => import("./modules/admin/admin.module").then((m) => m.AdminModule), canActivateChild: [adminGuard]},
  {path: 'user', loadChildren: () => import("./modules/user/user.module").then((m) => m.UserModule), canActivateChild: [userGuard]},
  {path: 'search', loadChildren: () => import("./modules/search/search.module").then((m) => m.SearchModule), canActivateChild: [userGuard]},
  {path: 'shop', loadChildren: () => import("./modules/shop/shop.module").then((m) => m.ShopModule), canActivateChild: [userGuard]},
  {path: 'invoice', loadChildren: () => import("./modules/invoice/invoice.module").then((m) => m.InvoiceModule), canActivateChild: [userGuard]},
  {path: 'home', component: LandingPageComponent, canActivateChild: [userGuard]},
  {path: 'how-it-works', component: HowItWorksPageComponent, canActivateChild: [userGuard]},
  {path: 'credits', component: CreditPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'top' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
