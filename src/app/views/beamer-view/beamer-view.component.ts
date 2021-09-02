import {
  AfterViewChecked,
  Component,
  ComponentFactoryResolver,
  HostListener,
  Injector,
  OnDestroy,
  OnInit,
  ViewChild,
  ViewContainerRef,
  ViewRef
} from '@angular/core';
import {Router} from '@angular/router';
import {AppConfigService} from '../../services/app-config.service';
import {NavBarItem} from '../../models/NavBarItem';
import {Subscription} from 'rxjs';
import {EventEmitterService} from '../../services/event-emitter.service';
import {configDiffer} from '../../util/configUpdaterHandlerFunctions';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';

@Component({
  selector: 'app-beamer-view',
  templateUrl: './beamer-view.component.html',
  styleUrls: ['./beamer-view.component.scss']
})
export class BeamerViewComponent implements OnInit, OnDestroy, AfterViewChecked {
  @ViewChild('dynamicElementInsertionPoint', { read: ViewContainerRef }) dynamicElementInsertionPoint: ViewContainerRef;
  private subscriptions: Subscription[] = [];
  private horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  private verticalPosition: MatSnackBarVerticalPosition = 'top';
  appConfig: NavBarItem[] = this.appConfigService.getConfig();
  beamerItems: NavBarItem[] = [];
  viewRefs = new Map<number, ViewRef>();
  counter = 0;
  period = 1000;
  infLoop;

  constructor(private router: Router,
              private appConfigService: AppConfigService,
              private eventEmitter: EventEmitterService,
              private componentFactoryResolver: ComponentFactoryResolver,
              private injector: Injector,
              private snackBar: MatSnackBar) {
    this.subscriptions.push(this.appConfigService.getAppConfig().subscribe( config => {
      this.appConfig = config;
      this.filterNotActiveForBeamerPresentation(config);
      this.createViews();
    }));
    this.subscriptions.push(this.eventEmitter.appConfigChangedObservable.subscribe(config => {
      configDiffer(this.appConfig, config);
      this.diffActiveForBeamerPresentationAfterConfigUpdate(config);
    }));
  }

  filterNotActiveForBeamerPresentation(config: NavBarItem[]) {
    config.forEach( item => {
      if (item.appComponents !== null && item.appComponents.length <= 0 && item.activeForBeamerPresentation ) {
        this.beamerItems.push(item);
      } else if (item.appComponents !== null && item.appComponents.length > 0) {
        this.filterNotActiveForBeamerPresentation(item.appComponents);
      }
    });
  }

  createViews() {
    this.beamerItems.forEach( item => {
      this.createComponentViewRef(item);
    });
    this.dynamicElementInsertionPoint.clear();
    this.dynamicElementInsertionPoint.insert(this.viewRefs.get(this.beamerItems[this.counter].id));
  }

  ngOnInit(): void {
    this.snackBar.open('Press escape to exit.', 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

  ngAfterViewChecked() {
    this.initComponentCycle();
  }

  ngOnDestroy() {
    this.subscriptions.forEach( sub => sub.unsubscribe());
    this.viewRefs.forEach(view => view.destroy());
    if (this.infLoop !== null){
      clearInterval(this.infLoop);
    }
  }

  initComponentCycle() {
    if (this.infLoop !== null){
      clearInterval(this.infLoop);
    }

    /**
     * Cycle through the viewRefs and set the timer of the current view
     */
    this.infLoop = setInterval( () => {
      this.dynamicElementInsertionPoint.detach(0);
      this.dynamicElementInsertionPoint.insert(this.viewRefs.get(this.beamerItems[this.counter].id));
      this.period = this.beamerItems[this.counter].beamerTimer;
      this.viewRefs.size - this.counter <= 1 ? this.counter = 0 : this.counter++;
    }, this.period);
  }

  diffActiveForBeamerPresentationAfterConfigUpdate(config: NavBarItem[]) {
    this.addItems(config);
    this.removeItems(this.beamerItems, config);
  }

  addItems(config: NavBarItem[]) {
    config.forEach( newItem => {
      const foundItem = this.beamerItems.find(x => x.id.toString() === newItem.id.toString());
      if (!foundItem && newItem.appComponents !== null && newItem.appComponents.length <= 0 && newItem.activeForBeamerPresentation) {
        this.beamerItems.push(newItem);
        this.createComponentViewRef(newItem);
      } else if ( newItem.appComponents !== null && newItem.appComponents.length > 0) {
        this.addItems(newItem.appComponents);
      }
    });
  }

  getIds(config: NavBarItem[], index: number[]) {
    config.forEach( item => {
      if (item.appComponents !== null && item.appComponents.length > 0) {
        this.getIds(item.appComponents, index);
      } else {
        if (item.activeForBeamerPresentation) {
          index.push(item.id);
        }
      }
    });
  }

  removeItems(oldBeamerItem: NavBarItem[], newConfig: NavBarItem[]) {
    const newConfigIds = [];
    const oldConfigIds = [];
    this.getIds(newConfig, newConfigIds);
    this.getIds(oldBeamerItem, oldConfigIds);
    const ids = oldConfigIds.filter(x => {
      return !newConfigIds.includes(x);
    });
    ids.forEach( id => {
      this.viewRefs.delete(id);
      const index = this.beamerItems.findIndex(x => x.id.toString() === id.toString());
      if (index !== null) {
        this.beamerItems.splice(index, 1);
      }
    });
  }

  createComponentViewRef(component) {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(component.usedComponent);
    const componentRef = componentFactory.create(this.injector);
    const viewRef = componentRef.hostView;
    (componentRef.instance as NavBarItem).data = component;
    this.viewRefs.set(component.id, viewRef);
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.router.navigate(['home']);
    }
  }
}
