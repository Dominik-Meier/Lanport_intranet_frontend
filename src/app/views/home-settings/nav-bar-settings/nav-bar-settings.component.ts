import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AdminPageService} from '../../../services/admin-page.service';
import {Subscription} from "rxjs";

@Component({
  selector: 'app-nav-bar-settings',
  templateUrl: './nav-bar-settings.component.html',
  styleUrls: ['./nav-bar-settings.component.scss']
})
export class NavBarSettingsComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[]= [];
  navBarItems = this.adminPageService.getNavBarItems();

  constructor( private adminPageService: AdminPageService, private router: Router) { }

  ngOnInit(): void {
    this.subscriptions.push(this.adminPageService.navBarItemsObservable.subscribe( navBarItems => {
      this.navBarItems = navBarItems;
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  onClickUser(event) {
  }

  onClickSettings(event) {
    this.router.navigate(['/home']);
  }

}
