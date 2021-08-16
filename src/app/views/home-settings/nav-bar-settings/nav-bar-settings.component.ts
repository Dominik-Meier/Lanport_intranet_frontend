import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AdminPageService} from "../../../services/admin-page.service";

@Component({
  selector: 'app-nav-bar-settings',
  templateUrl: './nav-bar-settings.component.html',
  styleUrls: ['./nav-bar-settings.component.scss']
})
export class NavBarSettingsComponent implements OnInit {
  navBarItems = this.adminPageService.getNavBarItems();

  constructor( private adminPageService: AdminPageService, private router: Router) { }

  ngOnInit(): void {
    this.adminPageService.navBarItemsObservable.subscribe( navBarItems => {
      this.navBarItems = navBarItems;
    });
  }

  onClickUser(event) {
  }

  onClickSettings(event) {
    this.router.navigate(['/home']);
  }

  onLPLogoClick(event) {
    window.location.href = 'https://www.lanport.ch';
  }

}
