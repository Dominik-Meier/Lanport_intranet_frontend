import {Injectable, Injector, isDevMode} from '@angular/core';
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

/** Pass untouched request through to the next request handler. */
@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  private errorMsgService: ErrorMsgService;

  constructor(private injector: Injector) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.errorMsgService = this.injector.get(ErrorMsgService);
    // @ts-ignore
    return next.handle(req).pipe(
      catchError( (err  => {
        let errMsg;
        if (err.status === 0) {
          errMsg =  new ErrorMsg('Request do Backend failed reason unknown.', 'Server Error: ');
        } else if (err.status === 401) {
          errMsg =  new ErrorMsg('Please login at main page first.', 'Unauthorized: ');
        } else if (err.status >= 404 && err.status < 600) {
          errMsg = new ErrorMsg(err.error.server_error, err.error.server_message);
        }
        this.errorMsgService.errorMsgSubject.next(errMsg);
        return err;
      }),
    ));
  }
}