import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SettingProfileComponent } from './components/setting-profile/setting-profile.component';

const routes: Routes = [
  {path: 'settings', component: SettingProfileComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
