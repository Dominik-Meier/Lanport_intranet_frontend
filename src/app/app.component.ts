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

// TODO NavItems unsaved names data -> add new item deletes changes of unsaved items
// TODO cursor on htmldisplay is not easy to find
// TODO Intranet can only be opened once cause token saved to user at DB
// TODO Beamer View does not changed on remove page when just beamer flag is deactivated -> Write test
// TODO price -> add pool options to show indication range -> on registration price will be (ex. 200-350)
// TODO Team add search functions -> like single player options for teams -> Or searching flag if not full
//  -> searching flag show as status for the team
// TODO random scroll bar @feedback
// TODO Tournament 12:00 -> registration time was changed and not published to frontend -> no updatedEvent on user seen

// TODO add more options like size to quill editor (custom Stuff)
// TODO sometimes the page closes on Update Event -> on HTMLDisplayer the bug was reported
// TODO survey
// TODO implement chat
// TODO implement sponsors
// TODO landing page
// TODO admin console for team, team members and participants
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
      this.snackBar.open(errMsg?.serverMsg.concat(errMsg.errorMsg), 'Close');
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
