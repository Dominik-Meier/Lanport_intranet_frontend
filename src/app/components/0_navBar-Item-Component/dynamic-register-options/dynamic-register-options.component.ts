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
      if (registerItem.getActive()) {
        registerItem.setActive(false);
      }

      if (registerItem.getName() === newRegisterOptionItem.getName()) {
        registerItem.setActive(true);
        this.activeRegisterOption = registerItem;
        this.registerOptions = Object.assign([], this.registerOptions);
      }
    });

    this.dynamicElementInsertionPoint.clear();

    //TODO is working but maybe check the error
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory( this.activeRegisterOption.getComponent());
    const componentRef = this.dynamicElementInsertionPoint.createComponent(componentFactory);
    (<DataDisplayerComponent>componentRef.instance).data = this.activeRegisterOption;
  }

}
