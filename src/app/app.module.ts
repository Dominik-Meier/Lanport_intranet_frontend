import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarItemComponent } from './components/nav-bar-item/nav-bar-item.component';
import { MatIconModule} from "@angular/material/icon";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from "@angular/material/card";
import { CookieService } from 'ngx-cookie-service';
import { TournamentComponent } from './components/tournament/tournament.component'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    NavBarItemComponent,
    TournamentComponent,
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
