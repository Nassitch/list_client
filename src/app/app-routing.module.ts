import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';

const routes: Routes = [
  {path: '', loadChildren: () => import("./modules/auth/auth.module").then((m) => m.AuthModule)},
  {path: 'user', loadChildren: () => import("./modules/user/user.module").then((m) => m.UserModule)},
  {path: 'search', loadChildren: () => import("./modules/search/search.module").then((m) => m.SearchModule)},
  {path: 'invoice', loadChildren: () => import("./modules/invoice/invoice.module").then((m) => m.InvoiceModule)},
  {path: 'home', component: LandingPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
