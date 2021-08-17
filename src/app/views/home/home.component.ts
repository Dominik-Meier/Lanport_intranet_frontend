import {
  Component,
  ComponentFactoryResolver, OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {LanpartyService} from '../../services/dataServices/lanparty.service';
import {NavBarItemService} from '../../services/nav-bar-item.service';
import {RegisterItemComponent} from '../../components/interfaces/registerItem.component';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  @ViewChild('dynamicElementInsertionPoint', { read: ViewContainerRef }) dynamicElementInsertionPoint: ViewContainerRef;
  private subscriptions: Subscription[] = [];
  private componentRef;
  public activeNavBarItem = null;
  public navItemIsActive = false;

  constructor(
    private lanpartyService: LanpartyService,
    private navBarItemService: NavBarItemService,
    private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
    // Load the Component associated to the NavBarItem
    this.subscriptions.push(this.navBarItemService.activeNavBarItemsObservable.subscribe(activeNavItem => {
      this.dynamicElementInsertionPoint.clear();
      this.navItemIsActive = false;
      if (activeNavItem != null) {
        this.activeNavBarItem = activeNavItem;
        if (this.activeNavBarItem.usedComponent) {
          const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.activeNavBarItem.usedComponent);
          this.componentRef = this.dynamicElementInsertionPoint.createComponent(componentFactory);
          (this.componentRef.instance as RegisterItemComponent).data = this.activeNavBarItem;
          this.navItemIsActive = true;
        }
      }
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
