import {Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {AdminPageService} from '../../services/admin-page.service';
import {NavBarItem} from '../../models/NavBarItem';
import {AppConfigService} from '../../services/app-config.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-home-settings',
  templateUrl: './home-settings.component.html',
  styleUrls: ['./home-settings.component.scss']
})

export class HomeSettingsComponent implements OnInit, OnDestroy {
  @ViewChild('dynamicElementInsertionPoint', { read: ViewContainerRef }) dynamicElementInsertionPoint: ViewContainerRef;
  private subscriptions: Subscription[] = [];
  public config: NavBarItem[];
  public activeNavBarItem;

  constructor( private adminPageService: AdminPageService,
               private appConfigService: AppConfigService,
               private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
    this.config = this.appConfigService.getConfig();
    this.subscriptions.push(this.appConfigService.configObservable.subscribe( c => this.config = c));
    this.subscriptions.push(this.adminPageService.activeNavBarItemsObservable.subscribe( activeNavItem => {
      this.activeNavBarItem = activeNavItem;
      this.setUsedComponent();
    }));
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  ifSetConfigActive() {
    return (this.activeNavBarItem && this.activeNavBarItem.name === 'App Navigation');
  }

  saveConfig(config: NavBarItem[]) {
    this.appConfigService.createAppConfig(this.config).subscribe();
  }

  setUsedComponent() {
    this.dynamicElementInsertionPoint.clear();
    if (this.activeNavBarItem && this.activeNavBarItem.name !== 'App Navigation') {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.activeNavBarItem.usedComponent);
      const componentRef = this.dynamicElementInsertionPoint.createComponent(componentFactory);
    }
  }
}
