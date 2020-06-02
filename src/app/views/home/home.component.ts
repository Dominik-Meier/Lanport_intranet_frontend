import {
  AfterViewChecked,
  Component,
  ComponentFactoryResolver,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {AuthService} from "../../services/auth-service.service";
import {OAuthService} from "angular-oauth2-oidc";
import {environment} from "../../../environments/environment";
import {LanpartyService} from "../../services/dataServices/lanparty.service";
import {NavBarItemService} from "../../services/nav-bar-item.service";
import {RegisterItemComponent} from "../../components/interfaces/registerItem.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('dynamicElementInsertionPoint', { read: ViewContainerRef }) dynamicElementInsertionPoint: ViewContainerRef;
  public activeNavBarItem;

  constructor(
    private authService: AuthService,
    private lanpartyService: LanpartyService,
    private navBarItemService: NavBarItemService,
    private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
    // if (environment.production === true && this.authService.isLoggedOut()) {
    if (environment.production === true && this.authService.isLoggedOut()) {
      console.log('You need to be logged in');
      window.location.href = 'https://www.lanport.ch/login';
    }

    if ( !environment.production) {
      //TODO what when user is return, what we do now?
      const user = this.authService.isLoggedIn();
    }

    // Load the Component associated to the NavBarItem
    this.navBarItemService.activeNavBarItemsObservable.subscribe( activeNavItem => {
      this.activeNavBarItem = activeNavItem;
      this.dynamicElementInsertionPoint.clear();
      if (this.activeNavBarItem.component) {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.activeNavBarItem.component);
        const componentRef = this.dynamicElementInsertionPoint.createComponent(componentFactory);
        (<RegisterItemComponent>componentRef.instance).data = this.activeNavBarItem.getOptions();
      }
    });
  }
}
