import {Component, OnInit, SimpleChanges} from '@angular/core';
import {NavBarItemService} from "../../services/nav-bar-item.service";
import {Router} from "@angular/router";
import {User} from "../../models/User";
import {AuthService} from "../../services/auth-service.service";
import {DisplayUserComponent} from "../display-user/display-user.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  navBarItems = this.navBarItemService.getNavBarItems();
  url = this.router.url;
  user: User = this.authService.getActiveUser();

  constructor( private navBarItemService: NavBarItemService,
               private authService: AuthService,
               public dialog: MatDialog,
               private router: Router) { }

  ngOnInit(): void {
    this.navBarItemService.navBarItemsObservable.subscribe( navBarItems => {
      this.navBarItems = navBarItems;
    });
    this.authService.getActiveUserObservable.subscribe( user => {
      this.user = user;
      console.log(user);
    })
  }

  checkUserRights() {
    let allowed = false;
    if(this.user){
      this.user.getRights() === 'admin' ? allowed = true : null;
      this.user.getRights() === 'Admin' ? allowed = true : null;
      this.user.getRights() === 'mitglied' ? allowed = true : null;
      this.user.getRights() === 'Mitglied' ? allowed = true : null;
    }
    return allowed;
  }

  onClickUser(event) {
    console.log('user icon clicked');
    if(this.user) {
      const dialogRef = this.dialog.open( DisplayUserComponent, {
        width: '50vw',
        data: {user: this.user}
      });

      dialogRef.afterClosed().subscribe( result => {
        console.log('user info closed');
      });

    }
  }

  // openDialog(row): void {
  //   const componentToLoad = this.innerConfigurationsComponents.get(row.component.componentName);
  //   const dialogRef = this.dialog.open( componentToLoad, {
  //     width: '50vw',
  //     data: {data: row.getData(), name: row.getName()}
  //   });
  //
  //   dialogRef.afterClosed().subscribe( result => {
  //     console.log(result);
  //     result ? row.setData(result) : null;
  //   });
  //   console.log(row);
  // }

  onClickSettings(event) {
    location.assign('settings');
  }

  onLPLogoClick(event) {
    window.location.href = 'https://www.lanport.ch';
  }

}
