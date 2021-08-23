import {
  Component,
  ComponentFactoryResolver, OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {RegisterItemComponent} from '../../components/interfaces/registerItem.component';
import {Subscription} from 'rxjs';
import {configDiffer} from '../../util/configUpdaterHandlerFunctions';
import {AppConfigService} from '../../services/app-config.service';
import {EventEmitterService} from '../../services/event-emitter.service';
import {NavBarItem} from '../../models/NavBarItem';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  @ViewChild('dynamicElementInsertionPoint', { read: ViewContainerRef }) dynamicElementInsertionPoint: ViewContainerRef;
  private subscriptions: Subscription[] = [];
  private componentRef;
  public config: NavBarItem[];
  public activeNavBarItem = null;
  public navItemIsActive = false;

  constructor(
    private eventEmitter: EventEmitterService,
    private appConfigService: AppConfigService,
    private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
    // initial load data
    this.config = this.appConfigService.getConfig();
    this.subscriptions.push(this.appConfigService.configObservable.subscribe( newConfig => {
      this.config = newConfig;
    }));
    this.subscriptions.push(this.eventEmitter.appConfigChangedObservable.subscribe( newConfig => {
      configDiffer(this.config, newConfig);
      this.checkIfActiveIsRemoved();
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  itemSelected(item: NavBarItem) {
    this.dynamicElementInsertionPoint.clear();
    this.navItemIsActive = false;
    if (item != null) {
      this.activeNavBarItem = item;
      if (this.activeNavBarItem.usedComponent) {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.activeNavBarItem.usedComponent);
        this.componentRef = this.dynamicElementInsertionPoint.createComponent(componentFactory);
        (this.componentRef.instance as RegisterItemComponent).data = this.activeNavBarItem;
        this.navItemIsActive = true;
      }
    }
  }

  checkIfActiveIsRemoved() {
    let found = false;
    for (const i of this.config) {
      if (i.appComponents) {
        for (const j of i.appComponents) {
          const res = j.appComponents.find(x => x.id.toString() === this.activeNavBarItem.id.toString());
          if (res) { found = true; }
        }
      } else {
        const res = i.appComponents.find(x => x.id.toString() === this.activeNavBarItem.id.toString());
        if (res) { found = true; }
      }
    }
    if (!found) {
      this.dynamicElementInsertionPoint.clear();
      this.navItemIsActive = false;
    }
  }
}
