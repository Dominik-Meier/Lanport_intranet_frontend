import {Injectable} from '@angular/core';
import {webSocket, WebSocketSubject } from 'rxjs/webSocket';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService  {

  private socket$: WebSocketSubject<any>;
  private eventSubject$ = new Subject();
  public eventObservable = this.eventSubject$.asObservable();

  constructor() { }

  public connect(): void {
    this.socket$ = webSocket('ws://localhost:3001');
    this.socket$.subscribe({
      next: (data) => {
        console.log('received msg');
        this.eventSubject$.next(data);
      },
      error: (err) => console.log(err),
      complete: () => {}
    });
  }

  public send(event): void {
    this.socket$.next(event);
  }
}
