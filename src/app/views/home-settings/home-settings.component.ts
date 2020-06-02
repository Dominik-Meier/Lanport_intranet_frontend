import {Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {AuthService} from "../../services/auth-service.service";
import {LanpartyService} from "../../services/dataServices/lanparty.service";
import {environment} from "../../../environments/environment";
import {AdminPageService} from "../../services/admin-page.service";

@Component({
  selector: 'app-home-settings',
  templateUrl: './home-settings.component.html',
  styleUrls: ['./home-settings.component.scss']
})
export class HomeSettingsComponent implements OnInit {
  @ViewChild('dynamicElementInsertionPoint', { read: ViewContainerRef }) dynamicElementInsertionPoint: ViewContainerRef;
  public activeNavBarItem;

  constructor(
    private authService: AuthService,
    private lanpartyService: LanpartyService,
    private adminPageService: AdminPageService,
    private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
    if (environment.production === true && this.authService.isLoggedOut() && this.authService.settingsRights()) {
      console.log('You need to be logged in');
      window.location.href = 'https://www.lanport.ch/login';
    }

    if ( !environment.production) {
      //TODO what when user is return, what we do now?
      const user = this.authService.isLoggedIn();
    }

    // Load the Component associated to the NavBarItem
    this.adminPageService.activeNavBarItemsObservable.subscribe( activeNavItem => {
      this.activeNavBarItem = activeNavItem;
      this.dynamicElementInsertionPoint.clear();
      if (this.activeNavBarItem.component) {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.activeNavBarItem.component);
        const componentRef = this.dynamicElementInsertionPoint.createComponent(componentFactory);
      }
    });
  }
}
