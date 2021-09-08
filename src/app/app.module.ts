import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { NavBarSettingsComponent } from './views/home-settings/nav-bar-settings/nav-bar-settings.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarItemSettingsComponent} from './views/home-settings/nav-bar-item/nav-bar-item-settings.component';
import { MatIconModule} from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { CookieService } from 'ngx-cookie-service';
import { HomeSettingsComponent } from './views/home-settings/home-settings.component';
import { RegisterItemComponent } from './components/register-item/register-item.component';
import { HtmlDisplayerComponent } from './components/1_registerOptions-Component/html-displayer/html-displayer.component';
import { SetAppNavigationComponent } from './components/3_settings_components/set-app-navigation/set-app-navigation.component';
import { MatTableModule} from '@angular/material/table';
import { MatSelectModule} from '@angular/material/select';
import { MatCheckboxModule} from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule} from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { HtmlDisplayerConfigurationComponent } from './components/1_registerOptions-Component/html-displayer/html-displayer-configuration/html-displayer-configuration.component';
import { LanpartySettingsComponent } from './components/3_settings_components/lanparty-settings/lanparty-settings.component';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { GamemodeSettingsComponent } from './components/3_settings_components/gamemode-settings/gamemode-settings.component';
import { TournamentTypeSettingsComponent } from './components/3_settings_components/tournament-type-settings/tournament-type-settings.component';
import { TournamentSettingsComponent } from './components/3_settings_components/tournament-settings/tournament-settings.component';
import { TournamentConfigurationComponent } from './components/1_registerOptions-Component/tournament/tournament-configuration/tournament-configuration.component';
import { TournamentComponent} from './components/1_registerOptions-Component/tournament/tournament.component';
import { DisplayUserComponent } from './components/display-user/display-user.component';
import { CreateTeamComponent } from './components/create-team/create-team.component';
import { DigitOnlyModule } from '@uiowa/digit-only';
import { QuillModule } from 'ngx-quill';
import { ShowTeamComponent } from './components/showTeam/show-team/show-team.component';
import { BeamerViewComponent } from './views/beamer-view/beamer-view.component';
import { EmptyComponent} from './components/util/empty-Component/empty.component';
import { MatMenuModule} from '@angular/material/menu';
import { MenuItemComponent } from './components/nav-bar/menu-item/menu-item.component';
import { SnackBarTextDisplayerComponent } from './components/util/snack-bar-text-displayer/snack-bar-text-displayer.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HrefComponent } from './components/1_registerOptions-Component/href-component/href.component';
import { HrefConfigurationComponent } from './components/1_registerOptions-Component/href-component/href-configuration/href-configuration.component';
import {HttpErrorInterceptor} from './util/httpErrorInterceptor';
import {OAuthModule} from 'angular-oauth2-oidc';
import {MatTooltipModule} from '@angular/material/tooltip';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    NavBarSettingsComponent,
    NavBarItemSettingsComponent,
    HomeSettingsComponent,
    RegisterItemComponent,
    HtmlDisplayerComponent,
    SetAppNavigationComponent,
    HtmlDisplayerConfigurationComponent,
    LanpartySettingsComponent,
    GamemodeSettingsComponent,
    TournamentTypeSettingsComponent,
    TournamentSettingsComponent,
    TournamentConfigurationComponent,
    TournamentComponent,
    DisplayUserComponent,
    CreateTeamComponent,
    ShowTeamComponent,
    BeamerViewComponent,
    EmptyComponent,
    MenuItemComponent,
    SnackBarTextDisplayerComponent,
    HrefComponent,
    HrefConfigurationComponent
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
        MatDatepickerModule,
        MatNativeDateModule,
        MatMenuModule,
        DigitOnlyModule,
        QuillModule.forRoot(),
        OAuthModule.forRoot(),
        MatTooltipModule
    ],
  exports: [
    MatIconModule,
    MatCardModule,
    MatMenuModule,
    MatSnackBarModule
  ],
  providers: [CookieService, {provide: HTTP_INTERCEPTORS, useClass: HttpErrorInterceptor, multi: true}],
  bootstrap: [AppComponent]
})

export class AppModule { }
