import {Component, OnInit, SimpleChanges} from '@angular/core';
import {NavBarItemService} from "../../services/nav-bar-item.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  navBarItems = this.navBarItemService.getNavBarItems();
  url = this.router.url;

  constructor( private navBarItemService: NavBarItemService,
               private router: Router) { }

  ngOnInit(): void {
    this.navBarItemService.navBarItemsObservable.subscribe( navBarItems => {
      this.navBarItems = navBarItems;
    })
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
