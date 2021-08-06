import {Injectable} from '@angular/core';
import {webSocket, WebSocketSubject } from 'rxjs/webSocket';
import {Subject} from 'rxjs';
import {jsDocComment} from "@angular/compiler";

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
