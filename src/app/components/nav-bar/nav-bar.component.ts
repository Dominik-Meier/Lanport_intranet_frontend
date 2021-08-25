import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Router} from '@angular/router';
import {User} from '../../models/User';
import {AuthService} from '../../services/auth-service.service';
import {DisplayUserComponent} from '../display-user/display-user.component';
import {MatDialog} from '@angular/material/dialog';
import {Subscription} from 'rxjs';
import {NavBarItem} from '../../models/NavBarItem';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];
  @Input() navBarItems: NavBarItem[];
  @Output() itemSelected = new EventEmitter<NavBarItem>();
  url = this.router.url;
  user: User = this.authService.getActiveUser();

  constructor( private authService: AuthService,
               public dialog: MatDialog,
               private router: Router) { }

  ngOnInit(): void {
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
      if (this.user.getLevel().toUpperCase() === 'ADMIN') { allowed = true; }
      if (this.user.getLevel().toUpperCase() === 'MITGLIED') { allowed = true; }
    }
    return allowed;
  }

  onClickUser(event) {
    if (this.user) {
      const dialogRef = this.dialog.open( DisplayUserComponent, {
        width: '25vw',
        data: {user: this.user}
      });
    }
  }

  onClickSettings(event) {
    this.router.navigate(['/settings']);
  }

  onClickBeamerView() {
    this.router.navigate(['/beamer']);
  }

  onLPLogoClick(event) {
    window.location.href = 'https://www.lanport.ch';
  }

  callItemSelected(item) {
    this.itemSelected.emit(item);
  }
}
