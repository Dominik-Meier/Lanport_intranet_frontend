import {Component, OnDestroy, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {DynamicElementService} from './services/dynamic-element.service';
import {WebSocketService} from './services/web-socket.service';
import {AuthService} from './services/auth-service.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  title = 'intranet';
  @ViewChild('dynamicElementInsertionPoint', { read: ViewContainerRef }) dynamicElementInsertionPoint: ViewContainerRef;

  constructor( private dynamicElementService: DynamicElementService,
               private ws: WebSocketService,
               private authService: AuthService,
               private router: Router) {
    router.navigate(['/empty']);
    this.subscriptions.push(this.authService.getActiveUserObservable.subscribe( () => {
      router.navigate(['/home']);
    }));
  }

  ngOnInit() {
    this.dynamicElementService.setInsertionPoint(this.dynamicElementInsertionPoint);
    this.ws.connect();
    this.authService.loadUser();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
