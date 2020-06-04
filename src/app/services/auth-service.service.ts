import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import * as moment from "moment";
import { CookieService } from 'ngx-cookie-service';
import {environment} from "../../environments/environment";
import {Observable, Subject} from "rxjs";
import {User} from "../models/User";
import {GameMode} from "../models/GameMode";
import {map} from "rxjs/operators";

// https://www.malcontentboffin.com/2017/11/Angular-Third-Party-Cookies.html
// https://blog.angular-university.io/angular-jwt-authentication/
// https://itnext.io/angular-8-how-to-use-cookies-14ab3f2e93fc?gi=108e16bfef9a

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private http: HttpClient,
              private cookieService: CookieService) {
    this.init();
  }

  init(): void {
    this.sess = environment.production ? this.cookieService.get('sess') : 'IBBICiPsLVEXMJvqWZYk8t4XJ6e0tI7O';
    console.log('sess', this.sess);
    if (this.sess) {
      this.getUser(this.sess).subscribe( res => {
        this.activeUser = res;
        this.activeUserSubject.next(this.activeUser);
        console.log(res);
      });
    }
  }

  private sess;
  private url = environment.BASE_API_URL;
  private activeUser: User;

  private activeUserSubject = new Subject<User>();
  public getActiveUserObservable = this.activeUserSubject.asObservable();

  getActiveUser() {
    return this.activeUser;
  }

  public isLoggedIn() {
    return this.activeUser ? true : false;
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  settingsRights() {
    let allowed = false;
    if(this.activeUser){
      this.activeUser.getRights() === 'admin' ? allowed = true : null;
      this.activeUser.getRights() === 'Admin' ? allowed = true : null;
      this.activeUser.getRights() === 'mitglied' ? allowed = true : null;
      this.activeUser.getRights() === 'Mitglied' ? allowed = true : null;
    }
    return allowed;
  }

  getUser(cookie: string): Observable<User> {
    const targetURL = this.url + 'users/' + cookie;
    return this.http.get(targetURL).pipe(map(
      res => {return this.mapJsonToUser(res);}
    ));
  }

  mapJsonToUser (data: any): User {
    console.log(data);
    return new User(data.nickname, data.registered, data.payed, data.seat, data.level);
  }
}
