import {
  Component,
  ComponentFactoryResolver,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {LanpartyService} from '../../services/dataServices/lanparty.service';
import {NavBarItemService} from '../../services/nav-bar-item.service';
import {RegisterItemComponent} from '../../components/interfaces/registerItem.component';
import {EventEmitterService} from "../../services/event-emitter.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('dynamicElementInsertionPoint', { read: ViewContainerRef }) dynamicElementInsertionPoint: ViewContainerRef;
  public activeNavBarItem = null;
  public navItemIsActive = false;


  constructor(
    private lanpartyService: LanpartyService,
    private navBarItemService: NavBarItemService,
    private componentFactoryResolver: ComponentFactoryResolver,
    private eventEmitter: EventEmitterService) { }

   ngOnInit(): void {
    // Load the Component associated to the NavBarItem
    this.navBarItemService.activeNavBarItemsObservable.subscribe(activeNavItem => {
      this.dynamicElementInsertionPoint.clear();
      this.navItemIsActive = false;
      if (activeNavItem != null) {
        this.activeNavBarItem = activeNavItem;
        if (this.activeNavBarItem.usedComponent) {
          const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.activeNavBarItem.usedComponent);
          const componentRef = this.dynamicElementInsertionPoint.createComponent(componentFactory);
          (componentRef.instance as RegisterItemComponent).data = this.activeNavBarItem.getOptions();
          this.navItemIsActive = true;
        }
      }
    });
  }
}
