import {Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {AdminPageService} from '../../services/admin-page.service';
import {NavBarItem} from '../../models/NavBarItem';
import {AppConfigService} from '../../services/app-config.service';
import {EventEmitterService} from '../../services/event-emitter.service';
import {Subscription} from 'rxjs';
import {SetAppNavigationComponent} from '../../components/3_settings_components/set-app-navigation/set-app-navigation.component';
import {configDiffer} from '../../util/configUpdaterHandlerFunctions';

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
               private componentFactoryResolver: ComponentFactoryResolver,
               private eventEmitter: EventEmitterService) { }

  ngOnInit(): void {
    this.config = this.appConfigService.getConfig();
    this.subscriptions.push(this.eventEmitter.appConfigChangedObservable.subscribe( config => {
      configDiffer(this.config, config);
      this.setUsedComponent();
    }));

    this.adminPageService.activeNavBarItemsObservable.subscribe( activeNavItem => {
      this.activeNavBarItem = activeNavItem;
      this.setUsedComponent();
    });
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  ifSetConfigActive() {
    return (this.activeNavBarItem && this.activeNavBarItem.usedComponent.name === 'SetAppNavigationComponent');
  }

  saveConfig(config: NavBarItem[]) {
    this.appConfigService.createAppConfig(this.config).subscribe();
  }

  setUsedComponent() {
    this.dynamicElementInsertionPoint.clear();
    if (this.activeNavBarItem.usedComponent && this.activeNavBarItem.usedComponent.name !== 'SetAppNavigationComponent') {
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.activeNavBarItem.usedComponent);
      const componentRef = this.dynamicElementInsertionPoint.createComponent(componentFactory);
    }
  }
}
