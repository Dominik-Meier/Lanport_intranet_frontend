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

// Questions
// How to handle not registerd users
// How to handle money
// how to handle double purchase -> online and at counter
// Need of request to page DB to see money and change its values

// TODO implement at various locations lanpartyId and if the current is active e.g tournament, food
// TODO menuItem each meal can only once be selected
// TODO item / beamer position place
// TODO mechanism to reopen done order as they disappear from the ui atm

// TODO implement chat
// TODO implement sponsors
// TODO landing page
// TODO admin console for team, team members and participants
// TODO implement AuthGuard and role access
// TODO twitch embedded streams
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
