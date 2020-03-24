import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import * as moment from "moment";
import {User} from "../models/User";
import {shareReplay} from "rxjs/operators";
import 'rxjs/add/operator/shareReplay';

// https://blog.angular-university.io/angular-jwt-authentication/

@Injectable()
export class AuthService {

  constructor(private http: HttpClient) {
  }

  login(email:string, password:string ) {
    return this.http.post<User>('/api/login', {email, password}).subscribe( res => {
      this.setSession(res);
      //TODO check if shareReplay is correct here!
      shareReplay(1);
    })
  }

  //TODO this is with request over lanport.ch auth

  private setSession(authResult) {
    const expiresAt = moment().add(authResult.expiresIn,'second');

    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem("expires_at", JSON.stringify(expiresAt.valueOf()) );
  }

  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
  }

  public isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

}
