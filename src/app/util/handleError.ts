import {HttpErrorResponse} from '@angular/common/http';
import {throwError} from 'rxjs';
import {isDevMode} from '@angular/core';

export function handleError(error: HttpErrorResponse) {
  if (error.status === 0) {
    // A client-side or network error occurred. Handle it accordingly.
    console.error('An error occurred:', error.error);
  } else if (error.status === 401) {
    console.error('Not authorized');
    if ( !isDevMode()) {
      window.location.href = 'https://www.lanport.ch/login';
    }
  } else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong.
    console.error(
      `Backend returned code ${error.status}, body was: `, error.error);
  }
  // Return an observable with a user-facing error message.
  return throwError(
    'Something bad happened; please try again later.');
}
