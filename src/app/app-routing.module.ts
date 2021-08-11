import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './views/home/home.component';
import {HomeSettingsComponent} from './views/home-settings/home-settings.component';
import {EmptyComponent} from './util/components/empty.component';


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'settings', component: HomeSettingsComponent},
  {path: 'empty', component: EmptyComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})

export class AppRoutingModule { }
