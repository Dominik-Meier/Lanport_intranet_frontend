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
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from "@angular/material/card";
import { CookieService } from 'ngx-cookie-service';
import { TournamentComponent } from './components/tournament/tournament.component';
import { HomeSettingsComponent } from './views/home-settings/home-settings.component';
import { RegisterItemComponent } from './components/register-item/register-item.component';
import { DynamicRegisterOptionsComponent } from './components/0_navBar-Item-Component/dynamic-register-options/dynamic-register-options.component';
import { HtmlDisplayerComponent } from './components/1_registerOptions-Component/html-displayer/html-displayer.component';
import { SetAppNavigationComponent } from './components/3_settings_components/set-app-navigation/set-app-navigation.component'
import {MatTableModule} from "@angular/material/table";
import {MatSelectModule} from "@angular/material/select";
import {MatCheckboxModule} from "@angular/material/checkbox";
import { MatButtonModule } from "@angular/material/button"
import {MatInputModule} from "@angular/material/input";
import { MatDialog, MatDialogRef, MatDialogModule } from "@angular/material/dialog";
import { DynamicRegisterOptionsConfigurationComponent } from './components/0_navBar-Item-Component/dynamic-register-options/dynamic-register-options-configuration/dynamic-register-options-configuration.component';
import { HtmlDisplayerConfigurationComponent } from './components/1_registerOptions-Component/html-displayer/html-displayer-configuration/html-displayer-configuration.component';


//TODO Send link of app to ben :)
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
    RegisterItemComponent,
    DynamicRegisterOptionsComponent,
    HtmlDisplayerComponent,
    SetAppNavigationComponent,
    DynamicRegisterOptionsConfigurationComponent,
    HtmlDisplayerConfigurationComponent,
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
    MatTableModule,
    MatSelectModule,
    MatCheckboxModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatDialogModule,
  ],
  exports: [
    MatIconModule,
    MatCardModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})

export class AppModule { }
