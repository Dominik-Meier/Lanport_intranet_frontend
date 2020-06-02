import {Component, OnInit, SimpleChanges} from '@angular/core';
import {NavBarItemService} from "../../services/nav-bar-item.service";
import {Router} from "@angular/router";
import {User} from "../../models/User";
import {AuthService} from "../../services/auth-service.service";

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

  }

  onClickSettings(event) {
    location.assign('settings');
  }

  onLPLogoClick(event) {
    window.location.href = 'https://www.lanport.ch';
  }

}
