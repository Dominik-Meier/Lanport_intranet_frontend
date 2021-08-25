import {Component, OnDestroy, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation} from '@angular/core';
import {WebSocketService} from './services/web-socket.service';
import {AuthService} from './services/auth-service.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
// TODO implement messages on http error
// TODO implement feedback component
// TODO implement chat
export class AppComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  title = 'intranet';
  @ViewChild('dynamicElementInsertionPoint', { read: ViewContainerRef }) dynamicElementInsertionPoint: ViewContainerRef;

  constructor( private ws: WebSocketService,
               private authService: AuthService,
               private router: Router) {
    router.navigate(['/empty']);
    this.subscriptions.push(this.authService.getActiveUserObservable.subscribe( () => {
      router.navigate(['/home']);
    }));
  }

  ngOnInit() {
    this.ws.connect();
    this.authService.loadUser();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
