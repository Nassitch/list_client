import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { HowItWorksPageComponent } from './components/how-it-works-page/how-it-works-page.component';
import { CreditPageComponent } from './components/credit-page/credit-page.component';

const routes: Routes = [
  {path: '', loadChildren: () => import("./modules/auth/auth.module").then((m) => m.AuthModule)},
  {path: 'admin', loadChildren: () => import("./modules/admin/admin.module").then((m) => m.AdminModule)},
  {path: 'user', loadChildren: () => import("./modules/user/user.module").then((m) => m.UserModule)},
  {path: 'search', loadChildren: () => import("./modules/search/search.module").then((m) => m.SearchModule)},
  {path: 'shop', loadChildren: () => import("./modules/shop/shop.module").then((m) => m.ShopModule)},
  {path: 'invoice', loadChildren: () => import("./modules/invoice/invoice.module").then((m) => m.InvoiceModule)},
  {path: 'home', component: LandingPageComponent},
  {path: 'how-it-works', component: HowItWorksPageComponent},
  {path: 'credits', component: CreditPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
