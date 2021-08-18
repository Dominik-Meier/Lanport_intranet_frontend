import {
  Component,
  ComponentFactoryResolver,
  Input,
  OnChanges,
  OnInit, SimpleChanges,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import {RegisterOptionItem} from '../../../models/registerOptionItem';
import {RegisterItemComponent} from '../../interfaces/registerItem.component';
import {ComponentWithNameComponent} from '../../interfaces/componentWithName.component';
import {DataDisplayerComponent} from '../../interfaces/dataDisplayer.component';
import {Subscription} from 'rxjs';
import {updateRegisterOptionItemWithNewConfig} from '../../../util/configUpdaterHandlerFunctions';
import {AppConfigService} from '../../../services/app-config.service';
import {EventEmitterService} from '../../../services/event-emitter.service';
import {NavBarItem} from '../../../models/NavBarItem';

@Component({
  selector: 'app-dynamic-register-options',
  templateUrl: './dynamic-register-options.component.html',
  styleUrls: ['./dynamic-register-options.component.scss']
})
export class DynamicRegisterOptionsComponent extends ComponentWithNameComponent implements OnInit, RegisterItemComponent, OnChanges {
  static componentName = 'DynamicRegisterOptionsComponent';
  @ViewChild('dynamicElementInsertionPoint', { read: ViewContainerRef }) dynamicElementInsertionPoint: ViewContainerRef;
  private subscriptions: Subscription[] = [];
  @Input() data: NavBarItem;
  navBarItem: NavBarItem;
  registerOptions: RegisterOptionItem[];
  activeRegisterOption: RegisterOptionItem;

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private appConfigService: AppConfigService,
              private eventEmitter: EventEmitterService) {
    super();
  }

  ngOnInit(): void {
    this.navBarItem = this.data;
    this.registerOptions = this.data.getOptions();
    // initial load data
    this.subscriptions.push(this.eventEmitter.appConfigChangedObservable.subscribe( newConfig => {
      const newNavBarItem = newConfig.find(x => x.id.toString() === this.navBarItem.id.toString());
      if (newNavBarItem) {
        updateRegisterOptionItemWithNewConfig(this.navBarItem, newNavBarItem);
        this.registerOptions = this.navBarItem.getOptions();
        this.reloadActiveComponent();
      }
    }));
  }

  ngOnChanges(changes: SimpleChanges): void { }

  activeRegisterOptionChange(newRegisterOptionItem: RegisterOptionItem) {
    this.registerOptions.forEach( registerItem => {
      if (registerItem.getActive() && registerItem.getName() !== newRegisterOptionItem.getName()) {
        registerItem.setActive(false);
      }

      if (newRegisterOptionItem.getActive() === true && registerItem.getName() === newRegisterOptionItem.getName()) {
        this.activeRegisterOption = registerItem;
        this.registerOptions = Object.assign([], this.registerOptions);
      }
    });

    this.dynamicElementInsertionPoint.clear();

    if (this.activeRegisterOption.getActive()) {
      const componentToResolve: any = this.activeRegisterOption.getComponent();
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentToResolve);
      const componentRef = this.dynamicElementInsertionPoint.createComponent(componentFactory);
      (componentRef.instance as DataDisplayerComponent).data = this.activeRegisterOption;
    }
  }

  reloadActiveComponent() {
    if (this.activeRegisterOption.getActive()) {
      this.dynamicElementInsertionPoint.clear();
      const componentToResolve: any = this.activeRegisterOption.getComponent();
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentToResolve);
      const componentRef = this.dynamicElementInsertionPoint.createComponent(componentFactory);
      (componentRef.instance as DataDisplayerComponent).data = this.activeRegisterOption;
    }
  }
}
