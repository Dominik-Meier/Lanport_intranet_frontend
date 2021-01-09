import {Component, ComponentFactoryResolver, Input, OnInit, Type, ViewChild, ViewContainerRef} from '@angular/core';
import {RegisterOptionItem} from "../../../models/registerOptionItem";
import {RegisterItemComponent} from "../../interfaces/registerItem.component";
import {ComponentWithNameComponent} from "../../interfaces/componentWithName.component";
import {DataDisplayerComponent} from "../../interfaces/dataDisplayer.component";
import {ComponentType} from "@angular/cdk/overlay";

@Component({
  selector: 'app-dynamic-register-options',
  templateUrl: './dynamic-register-options.component.html',
  styleUrls: ['./dynamic-register-options.component.scss']
})
export class DynamicRegisterOptionsComponent extends ComponentWithNameComponent implements OnInit, RegisterItemComponent {
  static componentName = "DynamicRegisterOptionsComponent";
  @ViewChild('dynamicElementInsertionPoint', { read: ViewContainerRef }) dynamicElementInsertionPoint: ViewContainerRef;
  @Input() data: RegisterOptionItem[];
  registerOptions: RegisterOptionItem[];
  activeRegisterOption: RegisterOptionItem;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) {
    super();
  }

  ngOnInit(): void {
    this.registerOptions = this.data;
  }

  activeRegisterOptionChange(newRegisterOptionItem: RegisterOptionItem) {
    this.registerOptions.forEach( registerItem => {
      if (registerItem.getActive() && registerItem.getName() != newRegisterOptionItem.getName()) {
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
      (<DataDisplayerComponent>componentRef.instance).data = this.activeRegisterOption;
    }
  }

}
