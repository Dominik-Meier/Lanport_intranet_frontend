import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as moment from 'moment';
import {CookieService} from 'ngx-cookie-service';
import {environment} from '../../environments/environment';
import {Observable, of, Subject} from 'rxjs';
import {User} from '../models/User';
import { map} from 'rxjs/operators';
import {mapJsonToUser} from '../util/mapperFunctions';

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
  private TOKEN_KEY = 'jwt_token';
  private REFRESH_TOKEN_KEY = 'jwt_refreshToken';

  private activeUserSubject = new Subject<User>();
  public getActiveUserObservable = this.activeUserSubject.asObservable();

  getActiveUser() {
    return this.activeUser;
  }

  /**
   * dev mode set cookie at browser console
   * document.cookie="keyofcookie=valueofcookie"
   */
  login() {
    if (this.cookieService.get('sess')) {
      this.getUser(this.cookieService.get('sess')).subscribe( user => {
        this.activeUser = user;
        this.activeUserSubject.next(this.activeUser);
      });
    }
  }

  /**
   * Login method of intranet
   * @param cookie to validate
   */
  getUser(cookie: string): Observable<User> {
    const targetURL = this.url + 'users/' + cookie;
    return this.http.get(targetURL).pipe(map( (u: User) => {
      this.saveToken(u.token, u.refreshToken);
      return mapJsonToUser(u);
    }));
  }

  signOut(): void {
    window.sessionStorage.clear();
  }

  public saveToken(token: string, refreshToken: string): void {
    window.sessionStorage.removeItem(this.TOKEN_KEY);
    window.sessionStorage.removeItem(this.REFRESH_TOKEN_KEY);
    window.sessionStorage.setItem(this.TOKEN_KEY, token);
    window.sessionStorage.setItem(this.REFRESH_TOKEN_KEY, refreshToken);
  }

  public getToken(): string | null {
    return window.sessionStorage.getItem(this.TOKEN_KEY);
  }

  public getRefreshToken(): string | null {
    return window.sessionStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  public clearToken() {
    window.sessionStorage.removeItem(this.TOKEN_KEY);
  }

  public isTokenExpired() {
    const token = this.getToken();
    if (token) {
      const expiry = (JSON.parse(atob(this.getToken().split('.')[1]))).exp;
      return (Math.floor((new Date()).getTime() / 1000) >= expiry);
    }
    return false;
  }

/*  public refreshToken() {
    const targetURL = this.url + 'users/refreshToken';
    return this.http.post(targetURL, {refreshToken: this.getRefreshToken()}).pipe(
      map( (newUser: User) => {
        console.log(newUser);
        this.saveToken(newUser.token, newUser.refreshToken);
        return newUser;
      })
    );
  }*/
}
