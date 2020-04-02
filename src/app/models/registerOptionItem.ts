import {Component, Type} from "@angular/core";
import {DynamicComponentDataProvider} from "./interfaces/dynamicComponentDataProvider";
import {ComponentWithNameComponent} from "../components/interfaces/componentWithName.component";

export class RegisterOptionItem implements DynamicComponentDataProvider{
  private name: string;
  private active: boolean;
  data: any;
  private component: ComponentWithNameComponent;

  constructor(name: string, data: any, component: ComponentWithNameComponent = null) {
    this.name = name;
    this.active = false;
    this.data = data;
    this.component = component;
  }

  getName() {
    return this.name;
  }

  getActive() {
    return this.active;
  }

  getComponent(): ComponentWithNameComponent {
    return this.component;
  }

  setName(name: string) {
    this.name = name;
  }

  setActive(active: boolean) {
    this.active = active;
  }


  toJSON() {
    const name = this.component ? this.component.componentName : '';
    return {
      'name': this.name,
      'active': this.active,
      'data': this.data,
      'component': name
    }
  }
}
