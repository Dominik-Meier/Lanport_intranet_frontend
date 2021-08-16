import {Component, Type} from '@angular/core';
import {RegisterOptionItem} from './registerOptionItem';
import {ComponentWithNameComponent} from '../components/interfaces/componentWithName.component';

/**
 * Is appRegisterComponent at backend
 */
export class NavBarItem {
  private id: number;
  private name: string;
  private appComponents: any[];
  private activeForIntranet: boolean;
  private usedComponent: ComponentWithNameComponent;
  private active: boolean;

  constructor(id: number, name: string, activeForIntranet: boolean, data: any, usedComponent: ComponentWithNameComponent = null) {
    this.id = id;
    this.name = name;
    this.activeForIntranet = activeForIntranet;
    this.usedComponent = usedComponent;
    if (data instanceof Array) {
      this.appComponents = data;
    } else {
      this.appComponents.push(data);
    }
    this.active = false;
  }

  getName() {
    return this.name;
  }

  getOptions(): any[] {
    return this.appComponents;
  }

  getActiveForIntranet(): boolean {
    return this.activeForIntranet;
  }

  getComponent() {
    return this.usedComponent;
  }

  setName(name: string) {
    this.name = name;
  }

  setActive(active: boolean) {
    this.active = active;
  }

  getActive() {
    return this.active;
  }

  setActiveForIntranet(activeForIntranet: boolean) {
    this.activeForIntranet = activeForIntranet;
  }

  setOptions( options: any) {
    this.appComponents = options;
  }

  addOption(newOption: any) {
    this.appComponents.push(newOption);
  }

  removeOption(option) {
    const index = this.appComponents.indexOf(option);
    if ( index !== -1) {
      this.appComponents.splice(index, 1);
    }
  }

  toJSON() {
    const opt = [];
    const name = this.usedComponent ? this.usedComponent.componentName : '';
    this.appComponents.forEach( option => {
      opt.push(option.toJSON());
    });

    return {
      id: this.id,
      name: this.name,
      appComponents: opt,
      activeForIntranet: this.activeForIntranet,
      usedComponent: name
    };
  }
}
