import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { NavBarSettingsComponent } from "./views/home-settings/nav-bar-settings/nav-bar-settings.component";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarItemComponent } from './components/nav-bar-item/nav-bar-item.component';
import { NavBarItemSettingsComponent} from "./views/home-settings/nav-bar-item/nav-bar-item-settings.component";
import { MatIconModule} from "@angular/material/icon";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from "@angular/material/card";
import { CookieService } from 'ngx-cookie-service';
import { TournamentComponent } from './components/tournament/tournament.component';
import { HomeSettingsComponent } from './views/home-settings/home-settings.component';
import { InfoComponent } from './components/info/info.component';
import { InfoRegisterItemComponent } from './components/info/info-register-item/info-register-item.component'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    NavBarSettingsComponent,
    NavBarItemComponent,
    NavBarItemSettingsComponent,
    TournamentComponent,
    HomeSettingsComponent,
    InfoComponent,
    InfoRegisterItemComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatIconModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatCardModule,
  ],
  exports: [
    MatIconModule,
    MatCardModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})

export class AppModule { }
