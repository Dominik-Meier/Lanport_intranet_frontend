import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as moment from 'moment';
import {CookieService} from 'ngx-cookie-service';
import {environment} from '../../environments/environment';
import {Observable, of, Subject} from 'rxjs';
import {User} from '../models/User';
import { map} from 'rxjs/operators';
import {mapJsonToUser} from "../util/mapperFunctions";

// https://www.malcontentboffin.com/2017/11/Angular-Third-Party-Cookies.html
// https://blog.angular-university.io/angular-jwt-authentication/
// https://itnext.io/angular-8-how-to-use-cookies-14ab3f2e93fc?gi=108e16bfef9a

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  constructor(private http: HttpClient,
              private cookieService: CookieService) {
  }

  private url = environment.BASE_API_URL;
  private activeUser: User;

  private activeUserSubject = new Subject<User>();
  public getActiveUserObservable = this.activeUserSubject.asObservable();

  getActiveUser() {
    return this.activeUser;
  }

  getExpiration() {
    const expiration = localStorage.getItem('expires_at');
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  settingsRights() {
    let allowed = false;
    if (this.activeUser){
      this.activeUser.getLevel() === 'admin' ? allowed = true : null;
      this.activeUser.getLevel() === 'Admin' ? allowed = true : null;
      this.activeUser.getLevel() === 'mitglied' ? allowed = true : null;
      this.activeUser.getLevel() === 'Mitglied' ? allowed = true : null;
    }
    return allowed;
  }

  /**
   * dev mode set cookie at browser console
   * document.cookie="keyofcookie=valueofcookie"
   */
  loadUser() {
    if (this.cookieService.get('sess')) {
      this.getUser(this.cookieService.get('sess')).subscribe( user => {
        this.activeUser = user;
        this.activeUserSubject.next(this.activeUser);
      });
    }
  }

  getUser(cookie: string): Observable<User> {
    const targetURL = this.url + 'users/' + cookie;
    return this.http.get(targetURL).pipe(map( u => mapJsonToUser(u)));
  }
}
