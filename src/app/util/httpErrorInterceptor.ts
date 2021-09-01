import {Injectable, Injector} from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';

import {BehaviorSubject, Observable,} from 'rxjs';
import {ErrorMsgService} from '../services/error-msg.service';
import {catchError, filter, switchMap, take} from 'rxjs/operators';
import {ErrorMsg} from '../models/errorMsg';
import {AuthService} from '../services/auth-service.service';
/*
https://www.bezkoder.com/angular-12-refresh-token/
*/

/** Pass untouched request through to the next request handler. */
@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  private errorMsgService: ErrorMsgService;
  private TOKEN_HEADER_KEY = 'Authorization';
  isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private injector: Injector, private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.errorMsgService = this.injector.get(ErrorMsgService);
    // Set jwt token
    const token = this.authService.getToken();
    if (token) {
      req = req.clone({headers: req.headers.set(this.TOKEN_HEADER_KEY, 'Bearer ' + token)});
    }

    // Handle backend error responses
    // @ts-ignore
    return next.handle(req).pipe(
      catchError( (err  => {
        let errMsg;
        if (err.status === 0) {
          errMsg =  new ErrorMsg('Request do Backend failed reason unknown.', 'Server Error: ');
          this.errorMsgService.errorMsgSubject.next(errMsg);
          return err;
        } else if (err.status === 401) {
          return this.handle401Error(req, next);
        } else if (err.status === 403) {
          errMsg =  new ErrorMsg('Please login at main page first.', 'Unauthorized: ');
          this.errorMsgService.errorMsgSubject.next(errMsg);
          return err;
        } else if (err.status >= 404 && err.status < 600) {
          errMsg = new ErrorMsg(err.error.server_error, err.error.server_message);
          this.errorMsgService.errorMsgSubject.next(errMsg);
          return err;
        }
      }),
    ));
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);

      const token = this.authService.getRefreshToken();

      if (token) {
        return this.authService.refreshToken().pipe(
          switchMap((newToken: any) => {
            this.isRefreshing = false;
            this.authService.saveToken(newToken.token, newToken.refreshToken);
            this.refreshTokenSubject.next(newToken.token);

            return next.handle(this.addTokenHeader(request, newToken.token));
          }),
          catchError((err) => {
            this.isRefreshing = false;

            this.authService.signOut();
            const errMsg = new ErrorMsg(err.error.server_error, err.error.server_message);
            this.errorMsgService.errorMsgSubject.next(errMsg);
            return err;
          })
        );
      }
    }
    return this.refreshTokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap((token) => next.handle(this.addTokenHeader(request, token)))
    );
  }

  private addTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({ headers: request.headers.set(this.TOKEN_HEADER_KEY, 'Bearer ' + token) });
  }
}
