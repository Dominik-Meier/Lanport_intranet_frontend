import {Component, Type} from "@angular/core";
import {RegisterOptionItem} from "./registerOptionItem";
import {ComponentWithNameComponent} from "../components/interfaces/componentWithName.component";

export class NavBarItem {
  private name: string;
  //TODO make this variable not always RegisterOptionITem
  private options: RegisterOptionItem[];
  private active: boolean;
  private component: ComponentWithNameComponent;

  constructor(name: string, options: RegisterOptionItem[], component: ComponentWithNameComponent = null) {
    this.name = name;
    this.options = options;
    this.active = false;
    this.component = component;
  }

  getName() {
    return this.name;
  }

  getOptions(): RegisterOptionItem[] {
    return this.options;
  }

  getActive() {
    return this.active;
  }

  getComponent() {
    return this.component;
  }

  setName(name: string) {
    this.name = name;
}

  setActive(active: boolean) {
    this.active = active;
  }

  toJSON() {
    const opt = [];
    const name = this.component ? this.component.componentName : '';
    this.options.forEach( option => {
      opt.push(option.toJSON());
    })

    return {
      'name': this.name,
      'options': opt,
      'active': this.active,
      'component': name
    }
  }
}
