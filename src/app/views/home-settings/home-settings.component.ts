import {Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {LanpartyService} from "../../services/dataServices/lanparty.service";
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
    private lanpartyService: LanpartyService,
    private adminPageService: AdminPageService,
    private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {

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
