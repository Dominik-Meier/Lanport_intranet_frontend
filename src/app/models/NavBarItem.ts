import {Component, Type} from "@angular/core";
import {RegisterOptionItem} from "./registerOptionItem";
import {ComponentWithNameComponent} from "../components/interfaces/componentWithName.component";

//TODO add an active bool, to disable pages or NavBar Items
export class NavBarItem {
  private name: string;
  /** Data for further components*/
  private data: any[];
  private active: boolean;
  private enabledAtIntranet: boolean;
  private component: ComponentWithNameComponent;

  constructor(name: string, enabledAtIntranet: boolean, data: any, component: ComponentWithNameComponent = null) {
    this.name = name;
    this.active = false;
    this.enabledAtIntranet = enabledAtIntranet;
    this.component = component;
    if (data instanceof Array) {
      this.data = data;
    } else {
      this.data.push(data);
    }
  }

  getName() {
    return this.name;
  }

  getOptions(): any[] {
    return this.data;
  }

  getActive() {
    return this.active;
  }

  getEnabledAtIntranet(): boolean {
    return this.enabledAtIntranet;
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

  setEnabledAtIntranet(enabledAtIntranet: boolean) {
    this.enabledAtIntranet = enabledAtIntranet;
  }

  setOptions( options: any) {
    this.data = options;
  }


  addOption(newOption: any) {
    this.data.push(newOption)
  }

  removeOption(option) {
    const index = this.data.indexOf(option);
    if ( index !== -1) {
      this.data.splice(index, 1);
    }
  }

  toJSON() {
    const opt = [];
    const name = this.component ? this.component.componentName : '';
    this.data.forEach( option => {
      opt.push(option.toJSON());
    })

    return {
      'name': this.name,
      'options': opt,
      'active': this.active,
      'enabledAtIntranet': this.getEnabledAtIntranet(),
      'component': name
    }
  }
}
