import {Component, OnDestroy, OnInit, ViewChild, ViewContainerRef, ViewEncapsulation} from '@angular/core';
import {WebSocketService} from './services/web-socket.service';
import {AuthService} from './services/auth-service.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {ErrorMsgService} from './services/error-msg.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

// TODO reconnect ws if connection lost

// TODO implement feedback component
// TODO implement chat
// TODO implement sponsors
// TODO landing page
// TODO implement AuthGuard and role access
export class AppComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  title = 'intranet';
  @ViewChild('dynamicElementInsertionPoint', { read: ViewContainerRef }) dynamicElementInsertionPoint: ViewContainerRef;

  constructor( private ws: WebSocketService,
               private authService: AuthService,
               private router: Router,
               private errorMsgService: ErrorMsgService,
               private snackBar: MatSnackBar) {
    router.navigate(['/empty']);
    this.subscriptions.push(this.authService.getActiveUserObservable.subscribe( () => {
      router.navigate(['/home']);
    }));
    this.subscriptions.push(errorMsgService.errorMsgObservable.subscribe( errMsg => {
      this.snackBar.open(errMsg.serverMsg.concat(errMsg.errorMsg), 'Close');
    }));
  }

  ngOnInit() {
    this.ws.connect();
    this.authService.login();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
