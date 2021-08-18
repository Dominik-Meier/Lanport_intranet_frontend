import {Component, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {NavBarItemService} from '../../services/nav-bar-item.service';
import {Router} from '@angular/router';
import {User} from '../../models/User';
import {AuthService} from '../../services/auth-service.service';
import {DisplayUserComponent} from '../display-user/display-user.component';
import {MatDialog} from '@angular/material/dialog';
import {AppConfigService} from '../../services/app-config.service';
import {EventEmitterService} from '../../services/event-emitter.service';
import {Subscription} from 'rxjs';
import { configDiffer } from '../../util/configUpdaterHandlerFunctions';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  navBarItems = this.appConfigService.getConfig();
  url = this.router.url;
  user: User = this.authService.getActiveUser();

  constructor( private navBarItemService: NavBarItemService,
               private appConfigService: AppConfigService,
               private authService: AuthService,
               private eventEmitter: EventEmitterService,
               public dialog: MatDialog,
               private router: Router) { }

  ngOnInit(): void {
    // initial load data
    this.subscriptions.push(this.appConfigService.configObservable.subscribe( newConfig => {
      this.navBarItems = newConfig;
    }));
    this.subscriptions.push(this.eventEmitter.appConfigChangedObservable.subscribe( newConfig => {
      configDiffer(this.navBarItems, newConfig);
    }));
    this.subscriptions.push(this.authService.getActiveUserObservable.subscribe( user => {
      this.user = user;
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  checkUserRights() {
    let allowed = false;
    if (this.user){
      this.user.getLevel() === 'admin' ? allowed = true : null;
      this.user.getLevel() === 'Admin' ? allowed = true : null;
      this.user.getLevel() === 'mitglied' ? allowed = true : null;
      this.user.getLevel() === 'Mitglied' ? allowed = true : null;
    }
    return allowed;
  }

  onClickUser(event) {
    console.log('user icon clicked');
    if (this.user) {
      const dialogRef = this.dialog.open( DisplayUserComponent, {
        width: '50vw',
        data: {user: this.user}
      });

      dialogRef.afterClosed().subscribe( result => {
        console.log('user info closed');
      });

    }
  }

  onClickSettings(event) {
    this.router.navigate(['/settings']);
  }

  onLPLogoClick(event) {
    window.location.href = 'https://www.lanport.ch';
  }
}
