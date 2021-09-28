import {Injectable} from '@angular/core';
import {webSocket, WebSocketSubject } from 'rxjs/webSocket';
import {Subject} from 'rxjs';
import {environment} from '../../environments/environment';
import {delay, retryWhen} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService  {

  private socket$: WebSocketSubject<any>;
  private eventSubject$ = new Subject();
  public eventObservable = this.eventSubject$.asObservable();
  private wsUrl = environment.BASE_WS_URL;

  constructor() { }

  public connect(): void {
    this.socket$ = webSocket(this.wsUrl);
    this.socket$.pipe(retryWhen(errors => errors.pipe(delay(1000)))).subscribe({
      next: (data) => {
        this.eventSubject$.next(this.parseJson(data));
      },
      error: (err) => console.error(err),
      complete: () => {}
    });
  }

  private send(event): void {
    this.socket$.next(event);
  }

  private parseJson(data) {
    try {
      data.data = JSON.parse(data.data);
      return data;
    } catch (e) {
      return data;
    }
  }
}
