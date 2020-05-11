import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import * as moment from "moment";
import { CookieService } from 'ngx-cookie-service';
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

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

  login(email:string, password:string ) {
    // TODO activate this method!
    // return this.http.post<User>('/api/login', {email, password})
    //   .pipe(map( res => this.setSession(res)));
  }


  //TODO this is with request over lanport.ch auth
  public isLoggedIn() {
    const phpsessid = this.cookieService.get('PHPSESSID');
    const sess = this.cookieService.get('sess');

    if (window.location.hostname === 'localhost') {
      this.cookieService.set('PHPSESSID', 'test-PHPSESSID', 10000)
      this.cookieService.set('sess', 'test-sess', 10000)
    }

    //For testing user request from lanport.ch
    this.getUser().subscribe( res => {
      console.log(res);
    });

    return !!(phpsessid && sess);
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration() {
    const expiration = localStorage.getItem("expires_at");
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }


  //For testing user request from lanport.ch
  getUser(): Observable<any> {
    const targetURL = this.url + 'users/' + 'iNNwXzWv9L2iDHLKEbVxOBA7ulETHhyc';
    return  this.http.get(targetURL);
  }

}
