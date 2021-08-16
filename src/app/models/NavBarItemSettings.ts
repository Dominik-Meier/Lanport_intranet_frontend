import { Type} from "@angular/core";
import {RegisterOptionItem} from "./registerOptionItem";

export class NavBarItemSettings {
  private name: string;
  private appComponents: RegisterOptionItem[];
  private active: boolean;
  private usedComponent: Type<any>;

  constructor(name: string, appComponents: RegisterOptionItem[], usedComponent: Type<any> = null) {
    this.name = name;
    this.appComponents = appComponents;
    this.active = false;
    this.usedComponent = usedComponent;
  }

  getName() {
    return this.name;
  }

  getActive() {
    return this.active;
  }

  setActive(active: boolean) {
    this.active = active;
  }
}
