import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';
import {ErrorMsg} from '../models/errorMsg';

@Injectable({
  providedIn: 'root'
})
export class ErrorMsgService {
  public errorMsgSubject = new Subject<ErrorMsg>();
  public errorMsgObservable = this.errorMsgSubject.asObservable();

  constructor() { }
}
