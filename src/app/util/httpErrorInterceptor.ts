import {Injectable, Injector} from '@angular/core';
import {
  HttpEvent,
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
} from '@angular/common/http';

import {Observable} from 'rxjs';
import {ErrorMsgService} from '../services/error-msg.service';
import {catchError} from 'rxjs/operators';
import {ErrorMsg} from '../models/errorMsg';
import {AuthService} from '../services/auth-service.service';
/*
https://github.com/IraErshova/angular-authorization/blob/master/client/src/app/services/token.interceptor.ts
*/

/** Pass untouched request through to the next request handler. */
@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  private errorMsgService: ErrorMsgService;
  private TOKEN_HEADER_KEY = 'Authorization';

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
        } else if (err.status === 401) {
          errMsg =  new ErrorMsg('Please login at main page first.', 'Unauthorized: ');
          this.authService.signOut();
        } else if (err.status === 403) {
          errMsg =  new ErrorMsg('Please login at main page first.', 'Unauthorized: ');
          this.authService.signOut();
        } else if (err.status >= 404 && err.status < 600) {
          errMsg = new ErrorMsg(err.error.server_error, err.error.server_message);
        }
        this.errorMsgService.errorMsgSubject.next(errMsg);
        return err;
      }),
    ));
  }
}
